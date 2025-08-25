# 🚀 Setup Rápido de Supabase (10 minutos)

## 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y registra una cuenta
2. Click **"New Project"**
3. Nombra tu proyecto: `herramienta-prefactibilidad`
4. Selecciona región más cercana
5. Genera contraseña fuerte para la DB
6. Click **"Create new project"**

⏱️ *Espera 2-3 minutos mientras se crea el proyecto*

## 2. Obtener Credenciales

1. Ve a **Settings** → **API** (en la barra lateral)
2. Copia estos valores:

```bash
Project URL: https://xxxxx.supabase.co
service_role key: eyJ0eXAiOiJKV1QiLCJhbGc...
```

## 3. Configurar Variables de Entorno

1. Copia `env.example` a `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Edita `.env.local` con tus credenciales:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
   ```

## 4. Crear Tabla en Supabase

1. Ve a **SQL Editor** en tu proyecto
2. Copia y pega el contenido completo de `supabase-setup.sql`
3. Click **"RUN"** (botón azul)
4. Verifica que aparezca "Success" ✅

## 5. Verificar Todo Funciona

1. Reinicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:3000/api/contact`
   - Debe mostrar: `{"status":"OK","message":"Contact API is running and Supabase is connected"}`

3. Prueba el flujo completo:
   - `http://localhost:3000/form` → Completa formulario → Ver preview
   - Llena el formulario de contacto al final
   - Ve a **Table Editor** en Supabase → tabla `contact_submissions`
   - Deberías ver tu registro ✅

## 🎉 ¡Listo!

Tu aplicación ahora está conectada a Supabase y almacenando datos en la nube.

## 📊 Ver Datos

- **Dashboard**: [tu-proyecto.supabase.co](https://supabase.com/dashboard)
- **Tabla**: Table Editor → `contact_submissions`
- **API**: Settings → API (para ver documentación auto-generada)

## ⚠️ Importante

- **Nunca comitees** `.env.local` al repositorio
- **Guarda bien** tu `service_role` key (tiene permisos administrativos)
- **Tier gratuito** incluye 500MB DB + 2GB transferencia mensual

## 🆘 Problemas Comunes

### Error: "Cannot read properties of undefined"
```bash
# Verificar que .env.local existe
ls -la .env.local

# Reiniciar servidor
npm run dev
```

### Error: "Invalid API key"
- Verificar que copiaste el `service_role` key (no el `anon` key)
- Verificar que no tiene espacios extra al copiar

### Tabla no existe
- Ejecutar nuevamente `supabase-setup.sql` en SQL Editor
- Verificar en Table Editor que `contact_submissions` aparece

### Datos no se guardan
- Verificar logs en **Logs** → **API** en Supabase  
- Verificar que el POST a `/api/contact` retorna status 200

### Error: "numeric field overflow"
- Si ves error con `code: '22003'` y mensaje sobre overflow
- Ejecutar `supabase-fix-overflow.sql` en SQL Editor
- Ver `FIX_OVERFLOW_ERROR.md` para detalles

## 📞 Soporte

Si tienes problemas:
1. Revisa `FIX_OVERFLOW_ERROR.md` para error de overflow numérico
2. Revisa `SUPABASE_MIGRATION.md` para detalles técnicos
3. Revisa `DATABASE_SETUP.md` para guía completa
4. Logs del servidor: ventana donde corre `npm run dev`
5. Logs de Supabase: Dashboard → Logs → API

