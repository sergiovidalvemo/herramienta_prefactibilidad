-- Crear tabla contact_submissions en Supabase
-- Ejecutar este script en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    fleet_size INTEGER,
    vehicle_type VARCHAR(50),
    operation_type VARCHAR(50),
    route_km_per_day DECIMAL(12,2),
    charging_window INTEGER,
    monthly_fuel_savings DECIMAL(12,2),
    savings_percentage DECIMAL(10,2),
    co2_avoided DECIMAL(12,2),
    battery_capacity_min INTEGER,
    battery_capacity_max INTEGER,
    preliminary_data_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_company ON contact_submissions(company);

-- Habilitar Row Level Security (RLS) - Opcional pero recomendado
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Política para permitir insertar datos (solo service role)
CREATE POLICY "Service role can insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Política para permitir leer datos (solo service role)  
CREATE POLICY "Service role can read contact submissions" ON contact_submissions
    FOR SELECT USING (true);

-- Comentarios para documentar la tabla
COMMENT ON TABLE contact_submissions IS 'Almacena las solicitudes de contacto con datos preliminares del análisis de electrificación';
COMMENT ON COLUMN contact_submissions.full_name IS 'Nombre completo del contacto';
COMMENT ON COLUMN contact_submissions.company IS 'Nombre de la empresa';
COMMENT ON COLUMN contact_submissions.position IS 'Cargo o posición en la empresa';
COMMENT ON COLUMN contact_submissions.email IS 'Correo electrónico de contacto';
COMMENT ON COLUMN contact_submissions.phone IS 'Número telefónico';
COMMENT ON COLUMN contact_submissions.route_km_per_day IS 'Kilómetros por día de la ruta - permite hasta 999,999,999,999.99 km';
COMMENT ON COLUMN contact_submissions.monthly_fuel_savings IS 'Ahorro mensual en combustible - permite hasta 999,999,999,999.99';
COMMENT ON COLUMN contact_submissions.savings_percentage IS 'Porcentaje de ahorro OPEX - permite valores hasta 99,999,999.99%';
COMMENT ON COLUMN contact_submissions.co2_avoided IS 'CO₂ evitado por año en toneladas - permite hasta 999,999,999,999.99 t';
COMMENT ON COLUMN contact_submissions.preliminary_data_json IS 'Todos los datos del análisis preliminar en formato JSON';
