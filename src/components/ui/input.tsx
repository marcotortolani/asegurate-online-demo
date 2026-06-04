'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

// Input "pill" con la estética de los formularios de cotización (autos/motos):
// border-4 + rounded-full + fuente Platform. El estado de error se activa con
// aria-invalid (react-hook-form lo setea automáticamente cuando hay error).
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full px-4 md:px-6 py-2 font-platform-regular text-xl text-primary placeholder:text-primary/60 bg-white border-4 border-gray-300 rounded-full transition-colors',
          'focus:outline-none focus:border-secondary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:border-red-500',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
