'use server'
import { NextResponse } from 'next/server'

const apiUrl = process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL || ''
const username = process.env.INFOAUTO_USERNAME
const password = process.env.INFOAUTO_PASSWORD

export async function POST() {
  try {
    if (!username || !password) {
      console.error('Faltan credenciales de InfoAuto')
      return NextResponse.json(
        { message: 'Faltan credenciales de InfoAuto' },
        { status: 500 }
      )
    }

    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    )
    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text()
      console.error('Error al obtener tokens de InfoAuto:', errorText)
      return NextResponse.json(
        {
          message: `Error: ${fetchResponse.status} ${fetchResponse.statusText}`,
          detail: errorText,
        },
        { status: fetchResponse.status }
      )
    }

    const data = await fetchResponse.json()
    const accessToken: string = data.access_token
    const refreshToken: string = data.refresh_token

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: 'No se recibieron los tokens esperados' },
        { status: 500 }
      )
    }

    const now = Math.floor(Date.now() / 1000)
    const cookieOptions: {
      httpOnly: boolean
      secure: boolean
      sameSite: 'lax' | 'strict' | 'none'
      path: string
    } = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    }

    const response = NextResponse.json(
      { accessToken, refreshToken, fromCache: false },
      { status: 200 }
    )

    response.cookies.set('infoauto_access_token', accessToken, {
      ...cookieOptions,
      maxAge: 3600,
    })
    response.cookies.set('infoauto_refresh_token', refreshToken, {
      ...cookieOptions,
      maxAge: 86400,
    })
    response.cookies.set(
      'infoauto_token_expiration',
      Math.floor(now + 3600).toString(),
      {
        ...cookieOptions,
        maxAge: 3600,
      }
    )

    return response
  } catch (error) {
    console.error('Error en la API Route:', error)
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'Error al obtener los tokens',
      },
      { status: 500 }
    )
  }
}
