# Configuración de Base de Datos con Supabase

## Requisitos

- Cuenta en [Supabase](https://supabase.com)
- Variables de entorno configuradas

## Configuración de Supabase

### 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Registra una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Elige tu organización
5. Nombra tu proyecto (ej: "herramienta-prefactibilidad")
6. Selecciona una región (recomendado: más cercana a tus usuarios)
7. Genera una contraseña segura para la base de datos
8. Haz clic en "Create new project"

### 2. Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** → **API**
2. Copia las siguientes credenciales:
   - **Project URL** (será tu `NEXT_PUBLIC_SUPABASE_URL`)
   - **Project API Keys** → **service_role** key (será tu `SUPABASE_SERVICE_ROLE_KEY`)

## Variables de Entorno

Crear un archivo `.env.local` con las siguientes variables:

\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...tu-service-role-key
\`\`\`

⚠️ **IMPORTANTE**: El `service_role` key tiene permisos administrativos. Nunca lo expongas en el cliente.

### 3. Crear la Tabla en Supabase

Ve a **SQL Editor** en tu dashboard de Supabase y ejecuta el script `supabase-setup.sql`:

1. Abre **SQL Editor** en tu proyecto de Supabase
2. Copia y pega el contenido del archivo `supabase-setup.sql`
3. Haz clic en **Run** para ejecutar el script

Alternativamente, puedes crear la tabla manualmente:

La estructura de la tabla será:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGSERIAL | Identificador único |
| full_name | VARCHAR(255) | Nombre completo |
| company | VARCHAR(255) | Empresa |
| position | VARCHAR(255) | Cargo |
| email | VARCHAR(255) | Correo electrónico |
| phone | VARCHAR(50) | Teléfono |
| fleet_size | INTEGER | Tamaño de flota |
| vehicle_type | VARCHAR(50) | Tipo de vehículo |
| operation_type | VARCHAR(50) | Tipo de operación |
| route_km_per_day | DECIMAL(10,2) | Kilómetros por día |
| charging_window | INTEGER | Ventana de carga |
| monthly_fuel_savings | DECIMAL(12,2) | Ahorro mensual combustible |
| savings_percentage | DECIMAL(5,2) | Porcentaje de ahorro |
| co2_avoided | DECIMAL(10,2) | CO₂ evitado |
| battery_capacity_min | INTEGER | Capacidad mínima batería |
| battery_capacity_max | INTEGER | Capacidad máxima batería |
| preliminary_data_json | JSONB | Datos completos del análisis |
| created_at | TIMESTAMP WITH TIME ZONE | Fecha de creación |
| updated_at | TIMESTAMP WITH TIME ZONE | Fecha de actualización |

## Verificar la Configuración

### 1. Verificar conexión API
Navegar a: `http://localhost:3000/api/contact`

Deberías ver una respuesta como:
\`\`\`json
{
  "status": "OK",
  "message": "Contact API is running and Supabase is connected",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "totalSubmissions": 0
}
\`\`\`

### 2. Ver datos en Supabase Dashboard
1. Ve a **Table Editor** en tu proyecto de Supabase
2. Selecciona la tabla `contact_submissions`
3. Verás todos los registros almacenados

### 3. Consultas SQL directas
En **SQL Editor** puedes ejecutar consultas como:
\`\`\`sql
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;
\`\`\`

## Solución de Problemas

### Error de conexión a Supabase
1. Verificar que las URLs y keys en `.env.local` sean correctas
2. Verificar que el proyecto de Supabase esté activo
3. Verificar que la tabla `contact_submissions` exista
4. Verificar los logs en el dashboard de Supabase

### Error de permisos RLS
Si tienes habilitado Row Level Security:
1. Asegúrate de usar el `service_role` key (no el `anon` key)
2. Verifica las políticas RLS en **Authentication** → **Policies**

### Variables de entorno faltantes
Error común: `Cannot read properties of undefined`
- Verificar que `.env.local` esté en la raíz del proyecto
- Verificar que las variables empiecen con `NEXT_PUBLIC_` o estén configuradas para el servidor

### Logs de debug
- Los errores se muestran en la consola del servidor Next.js
- También puedes ver logs en **Logs** → **API** en Supabase dashboard

## Funcionalidades del Formulario de Contacto

### Datos Capturados
- **Información de contacto**: Nombre, compañía, puesto, email, teléfono
- **Datos preliminares**: Todos los datos del análisis inicial (tamaño de flota, tipo de vehículo, operación, rutas, etc.)
- **Metadatos**: Timestamp de creación, datos en formato JSON

### Ubicación del Formulario
El formulario aparece en la página de preview de resultados (`/result/preview`) después de mostrar el análisis preliminar.

### Validaciones
- Todos los campos son obligatorios
- Validación de formato de email
- Almacenamiento seguro en PostgreSQL

### API Endpoint
- **POST** `/api/contact` - Guardar datos de contacto en Supabase
- **GET** `/api/contact` - Verificar estado de la API y conexión a Supabase

## Ventajas de Usar Supabase

### 🚀 Ventajas sobre PostgreSQL Local
- **Sin instalación**: No necesitas instalar PostgreSQL localmente
- **Escalabilidad**: Supabase maneja automáticamente el escalado
- **Dashboard visual**: Interfaz web para ver y administrar datos
- **Backups automáticos**: Supabase hace respaldos automáticos
- **APIs automáticas**: API REST y GraphQL generadas automáticamente
- **Tiempo real**: Suscripciones en tiempo real (opcional)
- **Autenticación integrada**: Sistema de auth incorporado (opcional)
- **Hosting global**: CDN y múltiples regiones disponibles

### 🔒 Seguridad
- **SSL/TLS**: Todas las conexiones están cifradas
- **Row Level Security**: Control granular de acceso a datos
- **API Keys**: Diferentes niveles de permisos (anon, authenticated, service_role)
- **Logs de auditoría**: Seguimiento de todas las operaciones

### 💰 Pricing
- **Tier gratuito**: 500MB de base de datos, 2GB de transferencia
- **Ideal para desarrollo y pruebas**
- **Escalamiento según necesidades**

## Migración de PostgreSQL Local

Si ya tenías datos en PostgreSQL local:

1. **Exportar datos**:
   \`\`\`sql
   COPY contact_submissions TO '/tmp/contacts.csv' DELIMITER ',' CSV HEADER;
   \`\`\`

2. **Importar en Supabase**:
   - Ve a **Table Editor** → `contact_submissions`
   - Haz clic en **Insert** → **Import data from CSV**
   - Sube tu archivo CSV

## Próximos Pasos Recomendados

1. **Configurar proyecto en Supabase** siguiendo esta documentación
2. **Crear archivo `.env.local`** con las credenciales
3. **Ejecutar el script SQL** para crear la tabla
4. **Probar la API** navegando a `/api/contact`
5. **Probar el formulario completo** desde `/form`
