'use server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const clientId = process.env.SANCOR_SEGUROS_API_KEY
const apiTokenURL = process.env.NEXT_PUBLIC_TOKEN_API_URL || ''
const username = process.env.SANCOR_SEGUROS_USERNAME
const password = process.env.SANCOR_SEGUROS_PASSWORD

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get('sancor_id_token')

  if (tokenCookie) {
    return NextResponse.json(
      { token: tokenCookie.value, fromCache: true },
      { status: 200 }
    )
  }

  const fakeToken = `token-${Date.now()}`

  cookieStore.set('sancor_id_token', fakeToken, {
    httpOnly: true,
    maxAge: 3600,
    path: '/',
  })

  // Obtener a dónde redirigir luego de generar el token
  const redirectUrl = new URL(request.url).searchParams.get('redirect') || '/'

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}

export async function POST() {
  try {
    if (!clientId) {
      console.error('Falta la variable de entorno SANCOR_SEGUROS_API_KEY')
      return NextResponse.json(
        { message: 'Falta la variable de entorno SANCOR_SEGUROS_API_KEY' },
        { status: 500 }
      )
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
      console.error(
        'Error en la respuesta de la API Sancor Seguros:',
        errorText
      )
      return NextResponse.json(
        {
          message: `Error: ${response.status} ${response.statusText}`,
          detail: errorText,
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      token: data.id_token,
      expiresIn: data.expires_in,
      fromCache: false,
    })
  } catch (error: unknown) {
    console.error('Error en la API Route:', error)
    return NextResponse.json(
      { message: error || 'Error al obtener el token' },
      { status: 500 }
    )
  }
}

// export async function POST() {
//   try {
//     if (!clientId) {
//       console.error('Falta la variable de entorno SANCOR_SEGUROS_API_KEY')
//       return NextResponse.json(
//         { message: 'Falta la variable de entorno SANCOR_SEGUROS_API_KEY' },
//         { status: 500 }
//       )
//     }

//     const cookieStore = await cookies()
//     const tokenCookie = cookieStore.get('sancor_id_token')

//     if (tokenCookie) {
//       return NextResponse.json(
//         { token: tokenCookie.value, fromCache: true },
//         { status: 200 }
//       )
//     }

//     const response = await fetch(
//       'https://external-pre-api.gruposancorseguros.com/apissa/pre-catalog/v2/security/auth0/token',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           accept: 'application/json',
//           gss_apiclient_id: clientId,
//         },
//         body: JSON.stringify({
//           username: 'pluna36732ws',
//           password: '15vr5QHEtgrw',
//         }),
//       }
//     )

//     if (!response.ok) {
//       const errorText = await response.text()
//       console.error(
//         'Error en la respuesta de la API Sancor Seguros:',
//         errorText
//       )
//       return NextResponse.json(
//         {
//           message: `Error: ${response.status} ${response.statusText}`,
//           detail: errorText,
//         },
//         { status: response.status }
//       )
//     }

//     const data = await response.json()

//     // Crear respuesta con cookie seteada
//     const res = NextResponse.json({ token: data.id_token, fromCache: false })

//     res.cookies.set({
//       name: 'sancor_id_token',
//       value: data.id_token,
//       maxAge: data.expires_in,
//       path: '/',
//       httpOnly: true,
//       secure: true,
//       sameSite: 'lax',
//     })

//     return res
//   } catch (error: unknown) {
//     console.error('Error en la API Route:', error)
//     return NextResponse.json(
//       { message: error || 'Error al obtener el token' },
//       { status: 500 }
//     )
//   }
// }
