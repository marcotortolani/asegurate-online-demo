'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InsuranceFormShell from '@/components/cotizar/seguros/insurance-form-shell'
import {
  EmailField,
  LocalidadField,
  NombreField,
  TelefonoField,
  TextField,
} from '@/components/cotizar/seguros/fields'
import {
  dni,
  email,
  fechaNacimiento,
  localidad,
  nombreCompleto,
  telefono,
} from '@/lib/validators'

const accidentesSchema = z.object({
  nombre: nombreCompleto,
  dni: dni,
  fechaNacimiento: fechaNacimiento(18),
  telefono: telefono,
  email: email,
  localidad: localidad,
})

export type AccidentesFormData = z.infer<typeof accidentesSchema>

export default function FormAccidentesPersonales({
  onSubmitData,
}: {
  // Punto único para conectar el envío real (email/API) en el ticket posterior.
  onSubmitData?: (data: AccidentesFormData) => void | Promise<void>
}) {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<AccidentesFormData>({
    resolver: zodResolver(accidentesSchema),
    defaultValues: {
      nombre: '',
      dni: '',
      fechaNacimiento: '',
      telefono: '',
      email: '',
      localidad: '',
    },
  })

  const onSubmit = async (data: AccidentesFormData) => {
    await onSubmitData?.(data)
    setSubmitted(true)
  }

  const handleReset = () => {
    form.reset()
    setSubmitted(false)
  }

  return (
    <InsuranceFormShell
      title="Seguro de Accidentes Personales"
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
          <NombreField<AccidentesFormData> name="nombre" />
          <TextField<AccidentesFormData>
            name="dni"
            label="DNI"
            placeholder="Ej: 20123123"
            inputMode="numeric"
          />
          <TextField<AccidentesFormData>
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            type="date"
          />
          <TelefonoField<AccidentesFormData> name="telefono" />
          <EmailField<AccidentesFormData> name="email" />
          <LocalidadField<AccidentesFormData> name="localidad" />

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
