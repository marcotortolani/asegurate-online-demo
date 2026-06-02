'use server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const clientId = process.env.SANCOR_SEGUROS_API_KEY
const apiSecret = process.env.SANCOR_SEGUROS_API_SECRET
const apiUrl = process.env.NEXT_PUBLIC_SANCOR_SEGUROS_API_URL

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('sancor_id_token')?.value

  // obtener el dato de zipCode pasado en el body de la request
  const { searchParams } = new URL(request.url)
  const zipCode = searchParams.get('zipCode')

  if (!token) {
    console.log('🔐 Token no encontrado')
    return NextResponse.json(
      { message: 'Token no encontrado' },
      { status: 401 }
    )
  }

  if (!clientId || !apiSecret || !apiUrl) {
    console.error('Faltan credenciales o URL de la API')
    return NextResponse.json(
      { message: 'Faltan credenciales o URL de la API' },
      { status: 500 }
    )
  }

  try {
    // Construir los query parameters (ajusta según tus necesidades)
    const queryParams = new URLSearchParams({
      zipCode: zipCode || '',
      countryCode: 'AR',
    }).toString()

    const url = `${apiUrl}/localities?${queryParams}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        gss_apiclient_id: clientId,
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Error en la respuesta de Sancor Seguros:')
      console.log('Response: ->', response)

      return NextResponse.json(
        { message: 'Error al obtener las pólizas' },
        { status: response.status }
      )
    }

    const data = await response.json()

    console.log('data: ->', data)
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Error en la API Route:', error)
    return NextResponse.json(
      { message: error || 'Error al obtener la cotización' },
      { status: 500 }
    )
  }
}
