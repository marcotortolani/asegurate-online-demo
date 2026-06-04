'use client'

import type { FieldValues, Path } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Campo de texto genérico conectado a react-hook-form (vía contexto del <Form>).
// Reutilizable por todos los formularios de seguros.
export function TextField<TValues extends FieldValues>({
  name,
  label,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete,
}: {
  name: Path<TValues>
  label: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
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
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

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
      label="Teléfono"
      placeholder="Ej: 11 1512345678"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
    />
  )
}

export function EmailField<T extends FieldValues>({
  name,
}: {
  name: Path<T>
}) {
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
