'use server'
import { NextResponse } from 'next/server'
import { ensureInfoAutoTokens } from '../../actions/infoauto'
import { ensureSancorTokens } from '../../actions/sancor'

export async function GET() {
  // Inicializar los tokens de InfoAuto
  const infoAutoResult = await ensureInfoAutoTokens()

  if (!infoAutoResult.success) {
    console.error(
      '[Initialize Tokens] Error al inicializar los tokens de InfoAuto:',
      infoAutoResult.error
    )
    return NextResponse.json(
      {
        message: 'Error al inicializar los tokens de InfoAuto',
        error: infoAutoResult.error,
      },
      { status: 500 }
    )
  }

  // Inicializar los tokens de Sancor Seguros
  const sancorResult = await ensureSancorTokens()

  if (!sancorResult.success) {
    console.error(
      '[Initialize Tokens] Error al inicializar los tokens de Sancor Seguros:',
      sancorResult.error
    )
    return NextResponse.json(
      {
        message: 'Error al inicializar los tokens de Sancor Seguros',
        error: sancorResult.error,
      },
      { status: 500 }
    )
  }

  // Redirigir de vuelta a la página deseada (o simplemente devolver éxito)
  return NextResponse.json({ success: true })
}
