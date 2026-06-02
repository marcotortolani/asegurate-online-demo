'use server'
import { cookies } from 'next/headers'

const accessTokenUrl = process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL || ''
const refreshTokenUrl = process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL || ''
const username = process.env.INFOAUTO_USERNAME
const password = process.env.INFOAUTO_PASSWORD

export async function ensureInfoAutoTokens() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('infoauto_access_token')?.value
  const tokenExpiration = cookieStore.get('infoauto_token_expiration')?.value
    ? parseInt(cookieStore.get('infoauto_token_expiration')?.value as string)
    : null
  const now = Math.floor(Date.now() / 1000)

  // Si el access token es válido, no hacemos nada
  if (accessToken && tokenExpiration && now < tokenExpiration - 300) {
    return { success: true, fromCache: true }
  }

  // Intentar renovar con el refresh token
  const refreshToken = cookieStore.get('infoauto_refresh_token')?.value
  if (refreshToken) {
    try {
      const refreshResponse = await fetch(refreshTokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (refreshResponse.ok) {
        return { success: true, fromCache: false }
      }
    } catch (error) {
      console.error(
        '[Server Action] Error al renovar el token de InfoAuto:',
        error
      )
    }
  }

  // Si no se puede renovar, generar nuevos tokens
  try {
    if (!username || !password) {
      throw new Error('Faltan credenciales de InfoAuto')
    }

    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    )
    const fetchResponse = await fetch(accessTokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text()
      throw new Error(
        `Error al obtener tokens de InfoAuto: ${fetchResponse.status} ${errorText}`
      )
    }

    const data = await fetchResponse.json()
    const newAccessToken: string = data.access_token
    const newRefreshToken: string = data.refresh_token

    if (!newAccessToken || !newRefreshToken) {
      throw new Error('No se recibieron los tokens esperados')
    }

    const now = Math.floor(Date.now() / 1000)
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    }

    cookieStore.set('infoauto_access_token', newAccessToken, {
      ...cookieOptions,
      maxAge: 3600,
    })
    cookieStore.set('infoauto_refresh_token', newRefreshToken, {
      ...cookieOptions,
      maxAge: 86400,
    })
    cookieStore.set(
      'infoauto_token_expiration',
      Math.floor(now + 3600).toString(),
      {
        ...cookieOptions,
        maxAge: 3600,
      }
    )

    return { success: true, fromCache: false }
  } catch (error) {
    console.error('[Server Action] Error al generar tokens de InfoAuto:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al generar tokens',
    }
  }
}
