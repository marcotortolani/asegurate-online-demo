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
  SelectField,
  TelefonoField,
  TextField,
} from '@/components/cotizar/seguros/fields'
import {
  dni,
  email,
  localidad,
  nombreCompleto,
  telefono,
  textoRequerido,
} from '@/lib/validators'

const TIPOS_VIVIENDA = [
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'barrio-cerrado', label: 'Barrio cerrado' },
  { value: 'quinta', label: 'Quinta' },
]

const CONDICION_VIVIENDA = [
  { value: 'propietario', label: 'Propietario' },
  { value: 'inquilino', label: 'Inquilino' },
]

const USO_VIVIENDA = [
  { value: 'permanente', label: 'Permanente' },
  { value: 'fin-de-semana', label: 'Fin de semana' },
]

const hogarSchema = z.object({
  nombre: nombreCompleto,
  dni: dni,
  telefono: telefono,
  email: email,
  direccion: textoRequerido('Ingresá la dirección').max(150, 'Demasiado largo'),
  localidad: localidad,
  tipoVivienda: textoRequerido('Seleccioná el tipo de vivienda'),
  condicion: textoRequerido('Seleccioná si sos propietario o inquilino'),
  uso: textoRequerido('Seleccioná el uso de la vivienda'),
})

export type HogarFormData = z.infer<typeof hogarSchema>

export default function FormHogar({
  onSubmitData,
}: {
  onSubmitData?: (data: HogarFormData) => void | Promise<void>
}) {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<HogarFormData>({
    resolver: zodResolver(hogarSchema),
    mode: 'onTouched',
    defaultValues: {
      nombre: '',
      dni: '',
      telefono: '',
      email: '',
      direccion: '',
      localidad: '',
      tipoVivienda: '',
      condicion: '',
      uso: '',
    },
  })

  const onSubmit = async (data: HogarFormData) => {
    await onSubmitData?.(data)
    setSubmitted(true)
  }

  const handleReset = () => {
    form.reset()
    setSubmitted(false)
  }

  return (
    <InsuranceFormShell
      title="Seguro de Hogar"
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
          <NombreField<HogarFormData> name="nombre" />
          <TextField<HogarFormData>
            name="dni"
            label="DNI"
            placeholder="Ej: 30123456"
            inputMode="numeric"
            maxLength={8}
            sanitize={(v) => v.replace(/\D/g, '')}
            hint="Sin puntos, los números seguidos."
          />
          <TelefonoField<HogarFormData> name="telefono" />
          <EmailField<HogarFormData> name="email" />
          <TextField<HogarFormData>
            name="direccion"
            label="Dirección"
            placeholder="Ej: Av. Rivadavia 5678"
            autoComplete="street-address"
          />
          <LocalidadField<HogarFormData> name="localidad" />
          <SelectField<HogarFormData>
            name="tipoVivienda"
            label="Tipo de vivienda"
            placeholder="Seleccioná el tipo"
            options={TIPOS_VIVIENDA}
          />
          <SelectField<HogarFormData>
            name="condicion"
            label="¿Propietario o inquilino?"
            placeholder="Seleccioná una opción"
            options={CONDICION_VIVIENDA}
          />
          <SelectField<HogarFormData>
            name="uso"
            label="¿Uso permanente o fin de semana?"
            placeholder="Seleccioná una opción"
            options={USO_VIVIENDA}
          />

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? 'Enviando…'
                : 'Solicitar cotización'}
            </Button>
          </div>
        </form>
      </Form>
    </InsuranceFormShell>
  )
}
