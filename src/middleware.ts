import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies
  const path = request.nextUrl.pathname

  // Manejo para Sancor Seguros
  if (path.startsWith('/api/sancor')) {
    const token = cookieStore.get('sancor_id_token')?.value

    if (!token) {
      console.log(
        '[Middleware] 🔐 Token de Sancor no encontrado, generando uno nuevo...'
      )
      try {
        const tokenResponse = await fetch(
          new URL('/api/sancor/token', request.url).toString(),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!tokenResponse.ok) {
          console.error(
            '[Middleware] Error al generar el token de Sancor:',
            await tokenResponse.text()
          )
          return NextResponse.json(
            { message: 'Error al generar el token de Sancor' },
            { status: 500 }
          )
        }

        // No necesitamos establecer la cookie aquí porque ya se hace en ensureSancorTokens
        return NextResponse.next()
      } catch (error) {
        console.error(
          '[Middleware] Error al generar el token de Sancor:',
          error
        )
        return NextResponse.json(
          { message: 'Error al generar el token de Sancor' },
          { status: 500 }
        )
      }
    }
  }

  // Manejo para InfoAuto
  if (
    path.startsWith('/api/infoauto') &&
    !path.includes('access-token') &&
    !path.includes('refresh-token')
  ) {
    const accessToken = cookieStore.get('infoauto_access_token')?.value
    const tokenExpiration = cookieStore.get('infoauto_token_expiration')?.value
      ? parseInt(cookieStore.get('infoauto_token_expiration')?.value || '')
      : null
    const now = Math.floor(Date.now() / 1000)

    if (!accessToken || !tokenExpiration || now >= tokenExpiration - 300) {
      console.log(
        '[Middleware] 🔐 Access token de InfoAuto no válido, intentando renovar...'
      )
      try {
        const refreshResponse = await fetch(
          new URL('/api/infoauto/refresh-token', request.url).toString(),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (!refreshResponse.ok) {
          console.error(
            '[Middleware] Error al renovar el token de InfoAuto:',
            await refreshResponse.text()
          )

          const accessResponse = await fetch(
            new URL('/api/infoauto/access-token', request.url).toString(),
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )

          if (!accessResponse.ok) {
            console.error(
              '[Middleware] Error al obtener nuevos tokens de InfoAuto:',
              await accessResponse.text()
            )
            return NextResponse.json(
              { message: 'Error al obtener nuevos tokens de InfoAuto' },
              { status: 500 }
            )
          }

          return NextResponse.next()
        }

        return NextResponse.next()
      } catch (error) {
        console.error(
          '[Middleware] Error al manejar el token de InfoAuto:',
          error
        )
        return NextResponse.json(
          { message: 'Error al manejar el token de InfoAuto' },
          { status: 500 }
        )
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/sancor/policies',
    '/api/sancor/quotation',
    '/api/infoauto/((?!access-token|refresh-token).*)', // Excluye las rutas que empiezan con "access-token" o "refresh-token"
  ],
}
