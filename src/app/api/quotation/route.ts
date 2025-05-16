'use server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    console.log('Iniciando solicitud a Sancor Seguros...')

    // Verificar las variables de entorno
    const clientId = process.env.SANCOR_SEGUROS_API_KEY
    const apiSecret = process.env.SANCOR_SEGUROS_API_SECRET
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    console.log('Client ID:', clientId ? 'Definido' : 'No definido')
    console.log('API Secret:', apiSecret ? 'Definido' : 'No definido')
    console.log('API URL:', apiUrl)

    if (!clientId || !apiSecret || !apiUrl) {
      console.error('Faltan credenciales o URL de la API')
      return NextResponse.json(
        { message: 'Faltan credenciales o URL de la API' },
        { status: 500 }
      )
    }

    console.log(
      'Haciendo solicitud a:',
      `${apiUrl}/quotations/vehicle/automotive`
    )

    const response = await fetch(`${apiUrl}/quotations/vehicle/automotive`, {
      method: 'POST',
      headers: {
        gss_apiclient_id: clientId,
        Authorization: apiSecret,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        vehicleQuotation: {
          relationQuotationCode: -7755019,
          person: {
            identificationNumber: 42055909,
            identificationType: 'D',
            isJuridicPerson: false,
          },
          coverModules: [],
        },
      }),
    })

    console.log(
      'Respuesta de Sancor Seguros:',
      response.status,
      response.statusText
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error en la respuesta de Sancor Seguros:', errorText)
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${errorText}`
      )
    }

    const data = await response.json()
    console.log('data: ->', data)
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error en la API Route:', error.message)
    return NextResponse.json(
      { message: error.message || 'Error al obtener la cotización' },
      { status: 500 }
    )
  }
}
