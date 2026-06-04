'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'neutral'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  neutral: 'bg-neutral-800 text-white hover:bg-neutral-600',
}

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariant
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 uppercase font-platform-medium tracking-wide text-lg px-8 py-2 rounded-2xl cursor-pointer transition-colors',
          'disabled:bg-primary-grayish disabled:cursor-not-allowed disabled:opacity-70',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
