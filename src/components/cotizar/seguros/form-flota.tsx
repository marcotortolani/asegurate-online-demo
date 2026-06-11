'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InsuranceFormShell from '@/components/cotizar/seguros/insurance-form-shell'
import {
  ContactoField,
  CuitField,
  EmailField,
  SelectField,
  TelefonoField,
  TextField,
} from '@/components/cotizar/seguros/fields'
import {
  cuit,
  email,
  enteroPositivo,
  soloLetras,
  telefono,
  textoRequerido,
} from '@/lib/validators'

const TIPOS_VEHICULO = [
  { value: 'autos', label: 'Autos' },
  { value: 'camionetas', label: 'Camionetas' },
  { value: 'camiones', label: 'Camiones' },
  { value: 'utilitarios', label: 'Utilitarios' },
  { value: 'motos', label: 'Motos' },
]

const flotaSchema = z.object({
  empresa: textoRequerido('Ingresá el nombre de la empresa').max(100, 'Demasiado largo'),
  cuit: cuit,
  contacto: soloLetras('Ingresá el nombre del contacto'),
  telefono: telefono,
  email: email,
  cantidadVehiculos: enteroPositivo('Ingresá la cantidad de vehículos'),
  tipo: textoRequerido('Seleccioná el tipo de vehículo'),
})

export type FlotaFormData = z.infer<typeof flotaSchema>

export default function FormFlota({
  onSubmitData,
}: {
  onSubmitData?: (data: FlotaFormData) => void | Promise<void>
}) {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FlotaFormData>({
    resolver: zodResolver(flotaSchema),
    mode: 'onTouched',
    defaultValues: {
      empresa: '',
      cuit: '',
      contacto: '',
      telefono: '',
      email: '',
      cantidadVehiculos: '',
      tipo: '',
    },
  })

  const onSubmit = async (data: FlotaFormData) => {
    await onSubmitData?.(data)
    setSubmitted(true)
  }

  const handleReset = () => {
    form.reset()
    setSubmitted(false)
  }

  return (
    <InsuranceFormShell
      title="Seguro de Flota"
      subtitle="Completá los datos de tu empresa y te asesoramos sin cargo."
      submitted={submitted}
      onReset={handleReset}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <TextField<FlotaFormData>
            name="empresa"
            label="Empresa"
            placeholder="Ej: Logística Norte S.A."
            autoComplete="organization"
          />
          <CuitField<FlotaFormData> name="cuit" />
          <ContactoField<FlotaFormData> name="contacto" />
          <TelefonoField<FlotaFormData> name="telefono" />
          <EmailField<FlotaFormData> name="email" />
          <TextField<FlotaFormData>
            name="cantidadVehiculos"
            label="Cantidad de vehículos"
            placeholder="Ej: 10"
            type="number"
            inputMode="numeric"
            min={1}
            max={9999}
            sanitize={(v) => v.replace(/[^0-9]/g, '')}
          />
          <SelectField<FlotaFormData>
            name="tipo"
            label="Tipo de vehículo"
            placeholder="Seleccioná el tipo"
            options={TIPOS_VEHICULO}
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
