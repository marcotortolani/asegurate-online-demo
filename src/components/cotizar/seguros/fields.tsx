'use client'

import type { FieldValues, Path } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Campo de texto genérico conectado a react-hook-form (vía contexto del <Form>).
// La prop `sanitize` filtra caracteres inválidos mientras el usuario escribe,
// antes de que el valor llegue al estado de RHF.
export function TextField<TValues extends FieldValues>({
  name,
  label,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete,
  maxLength,
  min,
  max,
  sanitize,
  hint,
}: {
  name: Path<TValues>
  label: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
  maxLength?: number
  min?: number | string
  max?: number | string
  sanitize?: (value: string) => string
  hint?: string
}) {
  return (
    <FormField<TValues>
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              inputMode={inputMode}
              autoComplete={autoComplete}
              placeholder={placeholder}
              maxLength={maxLength}
              min={min}
              max={max}
              {...field}
              onChange={(e) => {
                const val = sanitize ? sanitize(e.target.value) : e.target.value
                field.onChange(val)
              }}
            />
          </FormControl>
          {hint && <FormDescription>{hint}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// Filtros reutilizables de caracteres (usados en los presets).
// Nota: el guión debe estar al final o escapado para evitar crear rangos no deseados.
const soloLetrasYEspacios = (v: string) =>
  v.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s'\-]/g, '')

// Mantiene solo los caracteres aceptados por el validator de teléfono.
const soloTelefono = (v: string) => v.replace(/[^0-9\s+\-]/g, '')

// Presets de los campos compartidos por varios formularios.
export function NombreField<T extends FieldValues>({
  name,
}: {
  name: Path<T>
}) {
  return (
    <TextField<T>
      name={name}
      label="Nombre y apellido"
      placeholder="Ej: Juan Pérez"
      autoComplete="name"
      sanitize={soloLetrasYEspacios}
    />
  )
}

export function ContactoField<T extends FieldValues>({
  name,
}: {
  name: Path<T>
}) {
  return (
    <TextField<T>
      name={name}
      label="Contacto"
      placeholder="Ej: María González"
      autoComplete="name"
      sanitize={soloLetrasYEspacios}
    />
  )
}

export function TelefonoField<T extends FieldValues>({
  name,
}: {
  name: Path<T>
}) {
  return (
    <TextField<T>
      name={name}
      label="Teléfono celular"
      placeholder="Ej: 1112345678"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      sanitize={soloTelefono}
      hint="Celular sin el 0 ni el 15, los números seguidos."
    />
  )
}

export function CuitField<T extends FieldValues>({ name }: { name: Path<T> }) {
  return (
    <TextField<T>
      name={name}
      label="CUIT"
      placeholder="Ej: 30123456789"
      inputMode="numeric"
      maxLength={11}
      sanitize={(v) => v.replace(/\D/g, '')}
      hint="Sin guiones, los números seguidos."
    />
  )
}

export function EmailField<T extends FieldValues>({ name }: { name: Path<T> }) {
  return (
    <TextField<T>
      name={name}
      label="Correo electrónico"
      placeholder="Ej: juan@correo.com"
      type="email"
      inputMode="email"
      autoComplete="email"
    />
  )
}

export function LocalidadField<T extends FieldValues>({
  name,
}: {
  name: Path<T>
}) {
  return (
    <TextField<T>
      name={name}
      label="Localidad"
      placeholder="Ej: Córdoba"
      autoComplete="address-level2"
    />
  )
}

export function SelectField<TValues extends FieldValues>({
  name,
  label,
  placeholder = 'Seleccioná una opción',
  options,
}: {
  name: Path<TValues>
  label: string
  placeholder?: string
  options: { value: string; label: string }[]
}) {
  return (
    <FormField<TValues>
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            onOpenChange={(open) => {
              if (!open) field.onBlur()
            }}
          >
            <FormControl>
              <SelectTrigger className="w-full px-4 md:px-6 py-2 h-auto font-platform-regular text-xl text-primary bg-white border-4 border-gray-300 rounded-full transition-colors focus:outline-none focus:border-secondary focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-primary/60 aria-[invalid=true]:border-red-400">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
