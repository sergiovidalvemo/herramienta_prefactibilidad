# 🚨 Solución para Error de Overflow Numérico

## Problema

Si ves este error en la consola:

```
Supabase error: {
  code: '22003',
  details: 'A field with precision 5, scale 2 must round to an absolute value less than 10^3.',
  message: 'numeric field overflow'
}
```

Significa que el campo `savings_percentage` no puede almacenar el valor calculado porque es demasiado grande para el tipo `DECIMAL(5,2)` que solo permite hasta 999.99.

## 🔧 Solución Rápida (2 minutos)

### Si ya tienes la tabla creada:

1. **Ejecutar script de corrección**:
   - Ve a **SQL Editor** en tu proyecto de Supabase
   - Copia y pega el contenido completo de `supabase-fix-overflow.sql`
   - Haz clic en **RUN**
   - Debes ver "Success" ✅

2. **Verificar que funcionó**:
   - Reinicia tu servidor: `npm run dev`
   - Prueba el formulario de contacto nuevamente
   - Ahora debería guardar correctamente

### Si estás configurando por primera vez:

- Simplemente usa el archivo `supabase-setup.sql` actualizado (ya tiene los tipos correctos)

## 📊 Cambios Realizados

| Campo | Antes | Después | Límite Nuevo |
|-------|-------|---------|-------------|
| `savings_percentage` | DECIMAL(5,2) | DECIMAL(10,2) | Hasta 99,999,999.99% |
| `route_km_per_day` | DECIMAL(10,2) | DECIMAL(12,2) | Hasta 999,999,999,999.99 km |
| `co2_avoided` | DECIMAL(10,2) | DECIMAL(12,2) | Hasta 999,999,999,999.99 t |

## ✅ Verificación

Después de ejecutar el script, puedes verificar que los tipos se actualizaron:

```sql
SELECT column_name, data_type, numeric_precision, numeric_scale 
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND data_type = 'numeric'
ORDER BY column_name;
```

Deberías ver:
- `co2_avoided`: precision=12, scale=2
- `monthly_fuel_savings`: precision=12, scale=2
- `route_km_per_day`: precision=12, scale=2
- `savings_percentage`: precision=10, scale=2

## 🎯 Resultado

Ahora tu formulario de contacto puede manejar:
- ✅ Porcentajes de ahorro muy altos (ej: 2500%)
- ✅ Rutas muy largas (ej: 50,000 km/día)
- ✅ CO₂ evitado para flotas grandes (ej: 10,000 toneladas)
- ✅ Todos los casos de uso sin errores de overflow

## ❓ ¿Por qué pasó esto?

Los análisis de electrificación pueden generar porcentajes de ahorro muy altos, especialmente cuando:
- El costo del combustible es muy elevado
- La flota es muy grande
- Los vehículos actuales tienen muy baja eficiencia
- Los precios de electricidad son muy bajos

El tipo `DECIMAL(5,2)` original era demasiado restrictivo para estos casos reales.
