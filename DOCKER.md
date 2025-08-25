# 🐳 Docker Setup - Herramienta de Prefactibilidad VEMO

Esta guía te ayudará a ejecutar la aplicación de prefactibilidad de VEMO usando Docker.

## 📋 Prerrequisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- Al menos 2GB de RAM disponible

## 🚀 Inicio Rápido

### Opción 1: Solo la aplicación Next.js

\`\`\`bash
# Construir la imagen
docker build -t vemo-prefactibilidad .

# Ejecutar el contenedor
docker run -p 3000:3000 --name vemo-app vemo-prefactibilidad
\`\`\`

### Opción 2: Aplicación completa con Nginx (Recomendado)

\`\`\`bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
\`\`\`

## 🌐 Acceso a la Aplicación

- **Aplicación principal**: http://localhost:3000
- **Con Nginx**: http://localhost (puerto 80)
- **Health check**: http://localhost:3000/api/health

## 🔧 Comandos Útiles

### Construcción y Deployment

\`\`\`bash
# Construir imagen optimizada para producción
docker build -t vemo-prefactibilidad:latest .

# Construir sin cache
docker build --no-cache -t vemo-prefactibilidad .

# Ejecutar en modo detached
docker-compose up -d

# Reconstruir servicios
docker-compose up --build
\`\`\`

### Monitoreo y Debugging

\`\`\`bash
# Ver logs de la aplicación
docker-compose logs vemo-prefactibilidad

# Ver logs en tiempo real
docker-compose logs -f

# Ejecutar comando dentro del contenedor
docker exec -it vemo-app sh

# Inspeccionar el contenedor
docker inspect vemo-app

# Ver recursos utilizados
docker stats vemo-app
\`\`\`

### Mantenimiento

\`\`\`bash
# Limpiar imágenes no utilizadas
docker image prune -f

# Limpiar todo el sistema Docker
docker system prune -a

# Reiniciar servicios
docker-compose restart

# Parar y remover contenedores
docker-compose down --volumes
\`\`\`

## ⚙️ Variables de Entorno

Puedes personalizar la aplicación usando variables de entorno:

\`\`\`bash
# Archivo .env.production
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# Para desarrollo local
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

## 🏗️ Arquitectura Docker

### Multi-stage Build

El Dockerfile utiliza un build multi-stage para optimizar el tamaño:

1. **deps**: Instala dependencias de Node.js
2. **builder**: Construye la aplicación Next.js
3. **runner**: Imagen final optimizada para producción

### Servicios en Docker Compose

- **vemo-prefactibilidad**: Aplicación Next.js principal
- **nginx**: Reverse proxy y load balancer (opcional)

## 🔒 Configuración de Seguridad

### Headers de Seguridad (via Nginx)

- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

### Rate Limiting

- API: 10 requests/segundo con burst de 20
- Configurado en Nginx

## 📊 Health Checks

La aplicación incluye health checks automáticos:

\`\`\`javascript
// Endpoint: /api/health
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
\`\`\`

## 🚀 Deploy en Producción

### Con Docker Compose

\`\`\`bash
# Producción con SSL (configurar certificados)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
\`\`\`

### En Servidores Cloud

\`\`\`bash
# AWS ECS, Google Cloud Run, Azure Container Instances
docker tag vemo-prefactibilidad:latest your-registry/vemo-prefactibilidad:latest
docker push your-registry/vemo-prefactibilidad:latest
\`\`\`

## 🛠️ Troubleshooting

### Problemas Comunes

#### Puerto ya en uso
\`\`\`bash
# Verificar qué proceso usa el puerto
sudo lsof -i :3000

# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Puerto local:Puerto contenedor
\`\`\`

#### Problemas de memoria
\`\`\`bash
# Aumentar memoria disponible para Docker
# Docker Desktop > Settings > Resources > Memory > 4GB+
\`\`\`

#### Problemas de permisos
\`\`\`bash
# En Linux, agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker
\`\`\`

#### Build failures
\`\`\`bash
# Limpiar cache y reconstruir
docker builder prune
docker-compose build --no-cache
\`\`\`

### Logs de Debugging

\`\`\`bash
# Logs detallados de construcción
docker-compose build --progress=plain

# Logs de runtime con timestamps
docker-compose logs -t -f vemo-prefactibilidad
\`\`\`

## 📈 Optimizaciones de Rendimiento

### Caché de Dependencias

El Dockerfile está optimizado para cachear dependencias de Node.js, reduciendo tiempos de build.

### Compresión

- Nginx habilitado con compresión gzip
- Archivos estáticos cacheados por 1 año
- API responses cacheadas apropiadamente

### Recursos

- Imagen Alpine Linux (más liviana)
- Multi-stage build reduce tamaño final
- Usuario no-root para seguridad

## 🔄 Actualizaciones

\`\`\`bash
# Actualizar imagen
git pull origin main
docker-compose build
docker-compose up -d

# Zero-downtime deployment (con load balancer)
docker-compose up --scale vemo-prefactibilidad=2
# ... actualizar uno por uno
\`\`\`

## 📝 Notas Adicionales

- La aplicación usa pnpm como gestor de paquetes para builds más rápidos
- Configuración de Next.js optimizada para contenedores
- Health checks configurados para monitoreo automático
- Logs estructurados para mejor debugging en producción
