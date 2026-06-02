'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const apiUrl = process.env.NEXT_PUBLIC_CARS_INFOAUTO_URL || ''

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('infoauto_access_token')?.value

  if (!accessToken) {
    console.log('🔐 Access token no encontrado')
    return NextResponse.json(
      { message: 'Access token no encontrado' },
      { status: 401 }
    )
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error al obtener datos de InfoAuto:', errorText)
      return NextResponse.json(
        {
          message: `Error: ${response.status} ${response.statusText}`,
          detail: errorText,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error en la API Route:', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Error al obtener datos de InfoAuto',
      },
      { status: 500 }
    )
  }
}
