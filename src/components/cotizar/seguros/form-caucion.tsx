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
  montoPositivo,
  soloLetras,
  telefono,
  textoRequerido,
} from '@/lib/validators'

const TIPOS_CAUCION = [
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'licitacion', label: 'Licitación' },
  { value: 'ejecucion-contrato', label: 'Ejecución de contrato' },
  { value: 'aduanera', label: 'Aduanera' },
  { value: 'judicial', label: 'Judicial' },
]

const caucionSchema = z.object({
  razonSocial: textoRequerido('Ingresá la razón social').max(100, 'Demasiado largo'),
  cuit: cuit,
  actividad: textoRequerido('Ingresá la actividad de la empresa').max(80, 'Demasiado largo'),
  antiguedad: enteroPositivo('Ingresá la antigüedad en años'),
  facturacionAnual: montoPositivo('Ingresá la facturación anual'),
  contacto: soloLetras('Ingresá el nombre del contacto'),
  telefono: telefono,
  email: email,
  tipo: textoRequerido('Seleccioná el tipo de caución'),
})

export type CaucionFormData = z.infer<typeof caucionSchema>

export default function FormCaucion({
  onSubmitData,
}: {
  onSubmitData?: (data: CaucionFormData) => void | Promise<void>
}) {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<CaucionFormData>({
    resolver: zodResolver(caucionSchema),
    mode: 'onTouched',
    defaultValues: {
      razonSocial: '',
      cuit: '',
      actividad: '',
      antiguedad: '',
      facturacionAnual: '',
      contacto: '',
      telefono: '',
      email: '',
      tipo: '',
    },
  })

  const onSubmit = async (data: CaucionFormData) => {
    await onSubmitData?.(data)
    setSubmitted(true)
  }

  const handleReset = () => {
    form.reset()
    setSubmitted(false)
  }

  return (
    <InsuranceFormShell
      title="Seguro de Caución"
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
          <TextField<CaucionFormData>
            name="razonSocial"
            label="Razón social"
            placeholder="Ej: Constructora Sur S.A."
            autoComplete="organization"
          />
          <CuitField<CaucionFormData> name="cuit" />
          <TextField<CaucionFormData>
            name="actividad"
            label="Actividad"
            placeholder="Ej: Construcción"
          />
          <TextField<CaucionFormData>
            name="antiguedad"
            label="Antigüedad (años)"
            placeholder="Ej: 5"
            type="number"
            inputMode="numeric"
            min={1}
            max={200}
            sanitize={(v) => v.replace(/[^0-9]/g, '')}
          />
          <TextField<CaucionFormData>
            name="facturacionAnual"
            label="Facturación anual ($)"
            placeholder="Ej: 5000000"
            type="number"
            inputMode="numeric"
            min={1}
            sanitize={(v) => v.replace(/[^0-9]/g, '')}
          />
          <ContactoField<CaucionFormData> name="contacto" />
          <TelefonoField<CaucionFormData> name="telefono" />
          <EmailField<CaucionFormData> name="email" />
          <SelectField<CaucionFormData>
            name="tipo"
            label="Tipo de caución"
            placeholder="Seleccioná el tipo"
            options={TIPOS_CAUCION}
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
