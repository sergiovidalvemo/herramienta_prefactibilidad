-- Script para corregir overflow numérico en campos DECIMAL
-- Ejecutar este script en Supabase SQL Editor

-- Aumentar la precisión de savings_percentage para permitir valores más grandes
-- Cambiar de DECIMAL(5,2) a DECIMAL(10,2) para permitir hasta 99,999,999.99%
ALTER TABLE contact_submissions 
ALTER COLUMN savings_percentage TYPE DECIMAL(10,2);

-- También aumentar otros campos que podrían tener problemas similares
-- monthly_fuel_savings ya está en DECIMAL(12,2) que está bien
-- route_km_per_day cambiar a DECIMAL(12,2) para rutas muy largas
ALTER TABLE contact_submissions 
ALTER COLUMN route_km_per_day TYPE DECIMAL(12,2);

-- co2_avoided cambiar a DECIMAL(12,2) para flotas grandes
ALTER TABLE contact_submissions 
ALTER COLUMN co2_avoided TYPE DECIMAL(12,2);

-- Comentarios actualizados
COMMENT ON COLUMN contact_submissions.savings_percentage IS 'Porcentaje de ahorro OPEX - permite valores hasta 99,999,999.99%';
COMMENT ON COLUMN contact_submissions.route_km_per_day IS 'Kilómetros por día de la ruta - permite hasta 999,999,999,999.99 km';
COMMENT ON COLUMN contact_submissions.co2_avoided IS 'CO₂ evitado por año en toneladas - permite hasta 999,999,999,999.99 t';

-- Verificar los tipos de datos actualizados
SELECT column_name, data_type, numeric_precision, numeric_scale 
FROM information_schema.columns 
WHERE table_name = 'contact_submissions' 
AND data_type = 'numeric'
ORDER BY column_name;
