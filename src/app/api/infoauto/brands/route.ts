'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// const apiUrl = `${process.env.NEXT_PUBLIC_INFOAUTO_CARS_API}/brands/`
const apiUrlBase = 'https://demo.api.infoauto.com.ar/cars/pub/brands/'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const brandQuery = searchParams.get('query_string')
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('infoauto_access_token')?.value

  // Validar que se haya proporcionado un name (opcional, dependiendo de los requisitos)
  if (!brandQuery) {
    return NextResponse.json(
      { message: 'Falta el parámetro de búsqueda "brand"' },
      { status: 400 }
    )
  }

  if (!accessToken) {
    console.log('🔐 Access token no encontrado')
    return NextResponse.json(
      { message: 'Access token no encontrado' },
      { status: 401 }
    )
  }
  const apiUrl = `${apiUrlBase}?query_string=${encodeURIComponent(brandQuery)}`

  try {
    const fetchResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        paginate: 'true',
        page: '1',
        page_size: '20',
      },
    })

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text()
      console.error('Error al obtener marcas de InfoAuto:', errorText)
      return NextResponse.json(
        {
          message: `Error: ${fetchResponse.status} ${fetchResponse.statusText}`,
          detail: errorText,
        },
        { status: fetchResponse.status }
      )
    }

    const data = await fetchResponse.json()
    console.log('data en api/infoauto/brands: ', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error en la API Route:', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Error al obtener marcas de InfoAuto',
      },
      { status: 500 }
    )
  }
}
