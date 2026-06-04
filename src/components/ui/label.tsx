'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<'label'>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'pl-2 text-base font-platform-medium text-primary-grayish select-none',
      className
    )}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
