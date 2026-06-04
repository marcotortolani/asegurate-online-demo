import { z } from 'zod'

// Validadores Zod reutilizables para los formularios de seguros.
// Pensados para los 8 forms del roadmap (ART, Accidentes Personales, Flota,
// Caución, Comercio, Hogar, etc.), para mantener mensajes y reglas unificados.

export const nombreCompleto = z
  .string()
  .trim()
  .min(3, 'Ingresá tu nombre y apellido')
  .max(80, 'Demasiado largo')

export const email = z
  .string()
  .trim()
  .min(1, 'Ingresá tu correo electrónico')
  .email('Correo electrónico inválido')

export const telefono = z
  .string()
  .trim()
  .min(1, 'Ingresá tu teléfono')
  .refine((v) => /^[0-9\s+-]{6,20}$/.test(v), 'Teléfono inválido')

export const localidad = z
  .string()
  .trim()
  .min(2, 'Ingresá tu localidad')
  .max(80, 'Demasiado largo')

export const cuit = z
  .string()
  .trim()
  .min(1, 'Ingresá el CUIT')
  .refine(
    (v) => v.replace(/\D/g, '').length === 11,
    'El CUIT debe tener 11 dígitos'
  )

export const dni = z
  .string()
  .trim()
  .min(1, 'Ingresá el DNI')
  .refine((v) => /^\d{7,8}$/.test(v.replace(/\D/g, '')), 'DNI inválido')

export const textoRequerido = (mensaje = 'Campo requerido') =>
  z.string().trim().min(1, mensaje)

// Fecha de nacimiento desde un <input type="date"> (formato YYYY-MM-DD).
// Exige una fecha válida y edad mínima (por defecto 18 años).
export const fechaNacimiento = (edadMinima = 18) =>
  z
    .string()
    .min(1, 'Ingresá tu fecha de nacimiento')
    .refine((v) => !Number.isNaN(Date.parse(v)), 'Fecha inválida')
    .refine((v) => {
      const nacimiento = new Date(v)
      const hoy = new Date()
      let edad = hoy.getFullYear() - nacimiento.getFullYear()
      const m = hoy.getMonth() - nacimiento.getMonth()
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--
      return edad >= edadMinima && edad <= 110
    }, `Debés ser mayor de ${edadMinima} años`)
