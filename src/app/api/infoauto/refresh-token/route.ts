'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const apiUrl = process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL || ''

export async function POST() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('infoauto_refresh_token')?.value

    if (!refreshToken) {
      console.log('🔐 Refresh token no encontrado')
      return NextResponse.json(
        { message: 'Refresh token no encontrado' },
        { status: 401 }
      )
    }

    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('fetch response refresh token: ', fetchResponse)

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text()
      console.error('Error al renovar el token de InfoAuto:', errorText)
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
    const newRefreshToken: string = data.refresh_token || refreshToken

    if (!accessToken) {
      return NextResponse.json(
        { message: 'No se recibió el access token esperado' },
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
      { accessToken, refreshToken: newRefreshToken, fromCache: false },
      { status: 200 }
    )

    response.cookies.set('infoauto_access_token', accessToken, {
      ...cookieOptions,
      maxAge: 3600,
    })
    response.cookies.set('infoauto_refresh_token', newRefreshToken, {
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
          error instanceof Error ? error.message : 'Error al renovar el token',
      },
      { status: 500 }
    )
  }
}
