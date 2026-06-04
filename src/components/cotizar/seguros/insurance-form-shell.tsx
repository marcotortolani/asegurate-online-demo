'use client'

import { CheckCircle2 } from 'lucide-react'

import TitleSection from '@/components/title-section'
import { Button } from '@/components/ui/button'

// Contenedor visual común para los formularios de seguros (captura simple).
// Replica la estética del wizard de autos/motos: contenedor slate exterior +
// card blanca interior. Incluye la pantalla de éxito mock reutilizable.
export default function InsuranceFormShell({
  title,
  subtitle,
  submitted,
  onReset,
  successTitle = '¡Gracias por tu consulta!',
  successMessage = 'Recibimos tus datos. Un asesor se pondrá en contacto a la brevedad.',
  children,
}: {
  title: string
  subtitle?: string
  submitted: boolean
  onReset: () => void
  successTitle?: string
  successMessage?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative z-0 container mx-auto h-full p-0 md:p-6 mt-10">
      <TitleSection title={title} />

      <div className="z-40 relative w-full max-w-2xl lg:max-w-2xl mx-auto h-fit overflow-hidden p-2 md:p-4 bg-slate-200 shadow-black/60 shadow-lg rounded-3xl">
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-5 py-8">
              <CheckCircle2 className="w-20 h-20 text-secondary" />
              <h3 className="text-2xl font-platform-medium text-primary">
                {successTitle}
              </h3>
              <p className="max-w-md text-pretty font-platform-regular text-lg text-primary-grayish">
                {successMessage}
              </p>
              <Button variant="primary" onClick={onReset} className="mt-2">
                Enviar otra consulta
              </Button>
            </div>
          ) : (
            <>
              {subtitle && (
                <p className="mb-6 text-center text-pretty font-platform-regular text-lg text-primary-grayish">
                  {subtitle}
                </p>
              )}
              {children}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
