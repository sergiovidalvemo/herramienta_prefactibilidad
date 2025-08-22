#!/bin/bash

# Script para construir y desplegar la aplicación VEMO con Docker
# Uso: ./scripts/docker-build.sh [tag] [environment]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
TAG=${1:-"latest"}
ENV=${2:-"production"}
IMAGE_NAME="vemo-prefactibilidad"

echo -e "${BLUE}🐳 VEMO Docker Build Script${NC}"
echo -e "${BLUE}================================${NC}"
echo -e "Image: ${GREEN}${IMAGE_NAME}:${TAG}${NC}"
echo -e "Environment: ${GREEN}${ENV}${NC}"
echo ""

# Función para logging
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] ⚠️  $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ❌ $1${NC}"
    exit 1
}

# Verificar que Docker está disponible
if ! command -v docker &> /dev/null; then
    error "Docker no está instalado o no está disponible en PATH"
fi

# Verificar que Docker Compose está disponible
if ! command -v docker-compose &> /dev/null; then
    warn "Docker Compose no está disponible, algunas funciones estarán limitadas"
fi

log "🔍 Verificando estructura del proyecto..."

# Verificar archivos necesarios
REQUIRED_FILES=("Dockerfile" "package.json" "next.config.mjs")
for file in "${REQUIRED_FILES[@]}"; do
    if [[ ! -f "$file" ]]; then
        error "Archivo requerido no encontrado: $file"
    fi
done

log "✅ Estructura del proyecto verificada"

# Limpiar builds anteriores si se solicita
if [[ "$3" == "--clean" ]]; then
    log "🧹 Limpiando imágenes anteriores..."
    docker rmi "${IMAGE_NAME}:${TAG}" 2>/dev/null || true
    docker system prune -f
fi

log "🏗️  Construyendo imagen Docker..."

# Build de la imagen con información de build
docker build \
    --build-arg NODE_ENV="${ENV}" \
    --build-arg BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    --build-arg BUILD_VERSION="${TAG}" \
    --tag "${IMAGE_NAME}:${TAG}" \
    --progress=plain \
    .

if [[ $? -eq 0 ]]; then
    log "✅ Imagen construida exitosamente: ${IMAGE_NAME}:${TAG}"
else
    error "❌ Error construyendo la imagen"
fi

# Mostrar información de la imagen
log "📊 Información de la imagen:"
docker images "${IMAGE_NAME}:${TAG}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"

# Verificar health check
log "🏥 Probando health check..."
CONTAINER_ID=$(docker run -d -p 3001:3000 "${IMAGE_NAME}:${TAG}")

# Esperar que el contenedor inicie
sleep 10

# Probar health check
if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    log "✅ Health check exitoso"
else
    warn "⚠️  Health check falló, pero la imagen fue construida"
fi

# Limpiar contenedor de prueba
docker stop "$CONTAINER_ID" > /dev/null
docker rm "$CONTAINER_ID" > /dev/null

log "🎉 Build completado exitosamente"

# Mostrar comandos de ejecución
echo ""
echo -e "${BLUE}🚀 Comandos para ejecutar:${NC}"
echo -e "${GREEN}# Ejecutar solo la aplicación:${NC}"
echo -e "docker run -p 3000:3000 --name vemo-app ${IMAGE_NAME}:${TAG}"
echo ""
echo -e "${GREEN}# Ejecutar con Docker Compose:${NC}"
echo -e "docker-compose up -d"
echo ""
echo -e "${GREEN}# Ver logs:${NC}"
echo -e "docker logs -f vemo-app"
echo ""

# Opcional: tagear para registry
if [[ -n "$DOCKER_REGISTRY" ]]; then
    log "🏷️  Tagging para registry..."
    docker tag "${IMAGE_NAME}:${TAG}" "${DOCKER_REGISTRY}/${IMAGE_NAME}:${TAG}"
    
    if [[ "$4" == "--push" ]]; then
        log "📤 Pushing al registry..."
        docker push "${DOCKER_REGISTRY}/${IMAGE_NAME}:${TAG}"
        log "✅ Imagen subida al registry"
    fi
fi

log "🎯 Build script completado"
