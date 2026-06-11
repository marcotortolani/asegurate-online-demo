'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InsuranceFormShell from '@/components/cotizar/seguros/insurance-form-shell'
import {
  CuitField,
  EmailField,
  LocalidadField,
  NombreField,
  TelefonoField,
  TextField,
} from '@/components/cotizar/seguros/fields'
import {
  cuit,
  email,
  localidad,
  nombreCompleto,
  telefono,
  textoRequerido,
} from '@/lib/validators'

const artSchema = z.object({
  nombre: nombreCompleto,
  razonSocial: textoRequerido('Ingresá la empresa o razón social').max(100, 'Demasiado largo'),
  cuit: cuit,
  rubro: textoRequerido('Ingresá el rubro de actividad').max(80, 'Demasiado largo'),
  telefono: telefono,
  email: email,
  localidad: localidad,
})

export type ArtFormData = z.infer<typeof artSchema>

export default function FormArt({
  onSubmitData,
}: {
  // Punto único para conectar el envío real (email/API) en el ticket posterior.
  onSubmitData?: (data: ArtFormData) => void | Promise<void>
}) {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ArtFormData>({
    resolver: zodResolver(artSchema),
    mode: 'onTouched',
    defaultValues: {
      nombre: '',
      razonSocial: '',
      cuit: '',
      rubro: '',
      telefono: '',
      email: '',
      localidad: '',
    },
  })

  const onSubmit = async (data: ArtFormData) => {
    await onSubmitData?.(data)
    setSubmitted(true)
  }

  const handleReset = () => {
    form.reset()
    setSubmitted(false)
  }

  return (
    <InsuranceFormShell
      title="Seguro de ART"
      subtitle="Completá tus datos y te asesoramos sin cargo."
      submitted={submitted}
      onReset={handleReset}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <NombreField<ArtFormData> name="nombre" />
          <TextField<ArtFormData>
            name="razonSocial"
            label="Empresa / Razón social"
            placeholder="Ej: Comercio S.A."
            autoComplete="organization"
          />
          <CuitField<ArtFormData> name="cuit" />
          <TextField<ArtFormData>
            name="rubro"
            label="Rubro de actividad"
            placeholder="Ej: Gastronomía"
          />
          <TelefonoField<ArtFormData> name="telefono" />
          <EmailField<ArtFormData> name="email" />
          <LocalidadField<ArtFormData> name="localidad" />

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Enviando…' : 'Solicitar cotización'}
            </Button>
          </div>
        </form>
      </Form>
    </InsuranceFormShell>
  )
}
