'use server'
import { cookies } from 'next/headers'

const clientId = process.env.SANCOR_SEGUROS_API_KEY
const apiTokenURL = process.env.NEXT_PUBLIC_TOKEN_API_URL || ''
const username = process.env.SANCOR_SEGUROS_USERNAME
const password = process.env.SANCOR_SEGUROS_PASSWORD

export async function ensureSancorTokens() {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get('sancor_id_token')?.value

  // Si el token ya existe, no hacemos nada
  if (tokenCookie) {
    return { success: true, fromCache: true }
  }

  try {
    if (!clientId) {
      console.error('Falta la variable de entorno SANCOR_SEGUROS_API_KEY')
      return {
        success: false,
        message: 'Falta la variable de entorno SANCOR_SEGUROS_API_KEY',
      }
    }

    const response = await fetch(apiTokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        gss_apiclient_id: clientId,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Error al obtener el token de Sancor Seguros: ${response.status} ${errorText}`
      )
    }

    const data = await response.json()
    const newToken: string = data.id_token
    const expiresIn: number = data.expires_in || 3600 // Por defecto 1 hora si no se especifica

    if (!newToken) {
      throw new Error('No se recibió el token esperado')
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    }

    cookieStore.set('sancor_id_token', newToken, {
      ...cookieOptions,
      maxAge: expiresIn,
    })

    return { success: true, fromCache: false }
  } catch (error) {
    console.error(
      '[Server Action] Error al generar el token de Sancor Seguros:',
      error
    )
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Error al generar el token',
    }
  }
}
