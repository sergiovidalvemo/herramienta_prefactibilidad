import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface ContactData {
  fullName: string
  company: string
  position: string
  email: string
  phone: string
}

interface PreliminaryData {
  fleetSize?: number
  vehicleType?: string
  operationType?: string
  routeKmPerDay?: number
  chargingWindow?: number
  monthlyFuelSavings?: number
  savingsPct?: number
  co2?: number
  batteryCapacityMin?: number
  batteryCapacityMax?: number
}

interface RequestBody {
  contact: ContactData
  preliminaryData: PreliminaryData
}

// Interface para el tipo de datos que se guardan en Supabase
interface ContactSubmission {
  full_name: string
  company: string
  position: string
  email: string
  phone: string
  fleet_size?: number
  vehicle_type?: string
  operation_type?: string
  route_km_per_day?: number
  charging_window?: number
  monthly_fuel_savings?: number
  savings_percentage?: number
  co2_avoided?: number
  battery_capacity_min?: number
  battery_capacity_max?: number
  preliminary_data_json?: object
  created_at?: string
  updated_at?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json()
    
    // Validar datos requeridos
    if (!body.contact || !body.contact.fullName || !body.contact.email) {
      return NextResponse.json(
        { error: 'Missing required contact information' },
        { status: 400 }
      )
    }

    const { contact, preliminaryData } = body

    // Preparar datos para insertar en Supabase
    const submissionData: ContactSubmission = {
      full_name: contact.fullName,
      company: contact.company,
      position: contact.position,
      email: contact.email,
      phone: contact.phone,
      fleet_size: preliminaryData.fleetSize,
      vehicle_type: preliminaryData.vehicleType,
      operation_type: preliminaryData.operationType,
      route_km_per_day: preliminaryData.routeKmPerDay,
      charging_window: preliminaryData.chargingWindow,
      monthly_fuel_savings: preliminaryData.monthlyFuelSavings,
      savings_percentage: preliminaryData.savingsPct,
      co2_avoided: preliminaryData.co2,
      battery_capacity_min: preliminaryData.batteryCapacityMin,
      battery_capacity_max: preliminaryData.batteryCapacityMax,
      preliminary_data_json: preliminaryData,
    }

    // Insertar datos en Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([submissionData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Error saving contact information',
          details: error.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Contact information saved successfully',
      contactId: data[0].id
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint para verificar estado de la API
export async function GET() {
  try {
    // Verificar conexión con una consulta simple
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count', { count: 'exact', head: true })

    if (error) {
      console.error('Supabase health check error:', error)
      return NextResponse.json(
        { 
          status: 'ERROR',
          message: 'Supabase connection failed',
          error: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'OK',
      message: 'Contact API is running and Supabase is connected',
      timestamp: new Date().toISOString(),
      totalSubmissions: data || 0
    })

  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { 
        status: 'ERROR',
        message: 'API health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}