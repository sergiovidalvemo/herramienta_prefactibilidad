#!/bin/bash

# Script para desarrollo con Docker
# Uso: ./scripts/dev-docker.sh [command]

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Variables
COMPOSE_FILE="docker-compose.dev.yml"
SERVICE_NAME="vemo-prefactibilidad-dev"

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

case "$1" in
    "start"|"up")
        log "🚀 Iniciando entorno de desarrollo..."
        docker-compose -f $COMPOSE_FILE up -d
        log "✅ Aplicación corriendo en http://localhost:3000"
        ;;
    "stop"|"down")
        log "🛑 Deteniendo entorno de desarrollo..."
        docker-compose -f $COMPOSE_FILE down
        ;;
    "restart")
        log "🔄 Reiniciando entorno de desarrollo..."
        docker-compose -f $COMPOSE_FILE restart
        ;;
    "logs")
        docker-compose -f $COMPOSE_FILE logs -f
        ;;
    "shell"|"bash")
        docker-compose -f $COMPOSE_FILE exec $SERVICE_NAME sh
        ;;
    "install")
        log "📦 Instalando dependencias..."
        docker-compose -f $COMPOSE_FILE exec $SERVICE_NAME pnpm install
        ;;
    "build")
        log "🏗️  Reconstruyendo imagen de desarrollo..."
        docker-compose -f $COMPOSE_FILE build --no-cache
        ;;
    *)
        echo -e "${BLUE}🐳 VEMO Development Docker Script${NC}"
        echo ""
        echo "Uso: $0 [command]"
        echo ""
        echo "Comandos disponibles:"
        echo "  start/up    - Iniciar aplicación"
        echo "  stop/down   - Detener aplicación"
        echo "  restart     - Reiniciar aplicación"
        echo "  logs        - Ver logs en tiempo real"
        echo "  shell/bash  - Acceder al contenedor"
        echo "  install     - Instalar dependencias"
        echo "  build       - Reconstruir imagen"
        ;;
esac
