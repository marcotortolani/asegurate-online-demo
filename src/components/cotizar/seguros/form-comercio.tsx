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
  SelectField,
  TelefonoField,
  TextField,
} from '@/components/cotizar/seguros/fields'
import {
  cuit,
  email,
  enteroPositivo,
  localidad,
  telefono,
  textoRequerido,
} from '@/lib/validators'

const TENENCIA_LOCAL = [
  { value: 'propio', label: 'Propio' },
  { value: 'alquilado', label: 'Alquilado' },
]

const comercioSchema = z.object({
  razonSocial: textoRequerido('Ingresá la razón social').max(100, 'Demasiado largo'),
  nombreFantasia: textoRequerido('Ingresá el nombre de fantasía').max(100, 'Demasiado largo'),
  cuit: cuit,
  actividad: textoRequerido('Ingresá la actividad').max(80, 'Demasiado largo'),
  antiguedad: enteroPositivo('Ingresá la antigüedad en años'),
  telefono: telefono,
  email: email,
  direccion: textoRequerido('Ingresá la dirección').max(150, 'Demasiado largo'),
  localidad: localidad,
  tenenciaLocal: textoRequerido('Seleccioná si el local es propio o alquilado'),
})

export type ComercioFormData = z.infer<typeof comercioSchema>

export default function FormComercio({
  onSubmitData,
}: {
  onSubmitData?: (data: ComercioFormData) => void | Promise<void>
}) {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ComercioFormData>({
    resolver: zodResolver(comercioSchema),
    mode: 'onTouched',
    defaultValues: {
      razonSocial: '',
      nombreFantasia: '',
      cuit: '',
      actividad: '',
      antiguedad: '',
      telefono: '',
      email: '',
      direccion: '',
      localidad: '',
      tenenciaLocal: '',
    },
  })

  const onSubmit = async (data: ComercioFormData) => {
    await onSubmitData?.(data)
    setSubmitted(true)
  }

  const handleReset = () => {
    form.reset()
    setSubmitted(false)
  }

  return (
    <InsuranceFormShell
      title="Seguro de Comercio"
      subtitle="Completá los datos de tu negocio y te asesoramos sin cargo."
      submitted={submitted}
      onReset={handleReset}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <TextField<ComercioFormData>
            name="razonSocial"
            label="Razón social"
            placeholder="Ej: Comercio Sur S.R.L."
            autoComplete="organization"
          />
          <TextField<ComercioFormData>
            name="nombreFantasia"
            label="Nombre de fantasía"
            placeholder="Ej: El Almacén del Sur"
          />
          <CuitField<ComercioFormData> name="cuit" />
          <TextField<ComercioFormData>
            name="actividad"
            label="Actividad"
            placeholder="Ej: Venta de indumentaria"
          />
          <TextField<ComercioFormData>
            name="antiguedad"
            label="Antigüedad (años)"
            placeholder="Ej: 3"
            type="number"
            inputMode="numeric"
            min={1}
            max={200}
            sanitize={(v) => v.replace(/[^0-9]/g, '')}
          />
          <TelefonoField<ComercioFormData> name="telefono" />
          <EmailField<ComercioFormData> name="email" />
          <TextField<ComercioFormData>
            name="direccion"
            label="Dirección"
            placeholder="Ej: Av. Corrientes 1234"
            autoComplete="street-address"
          />
          <LocalidadField<ComercioFormData> name="localidad" />
          <SelectField<ComercioFormData>
            name="tenenciaLocal"
            label="¿Local propio o alquilado?"
            placeholder="Seleccioná una opción"
            options={TENENCIA_LOCAL}
          />

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
