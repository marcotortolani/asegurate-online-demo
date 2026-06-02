'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const BASE_URL = 'https://demo.api.infoauto.com.ar/cars/pub'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ brand_id: string }> }
) {
  const resolvedParams = await params
  const brandId = resolvedParams.brand_id

  // Validar que se haya proporcionado un brand_id
  if (!brandId) {
    return NextResponse.json(
      { message: 'Falta el brand_id en la ruta' },
      { status: 400 }
    )
  }

  const apiUrl = `${BASE_URL}/brands/${brandId}/models/`

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
    const fetchResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text()
      console.error('Error al obtener modelos de InfoAuto:', errorText)
      return NextResponse.json(
        {
          message: `Error: ${fetchResponse.status} ${fetchResponse.statusText}`,
          detail: errorText,
        },
        { status: fetchResponse.status }
      )
    }

    const data = await fetchResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error en la API Route:', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Error al obtener modelos de InfoAuto',
      },
      { status: 500 }
    )
  }
}
