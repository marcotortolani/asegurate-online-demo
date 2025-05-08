'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={
        className +
        ` bg-primary-grayish hover:bg-primary-dark text-white px-4 md:h-6 lg:h-8 flex items-center justify-center font-platform-regular md:text-xs lg:text-xl text-center rounded-full hover:text-gray-200 transition-all duration-200 ease-in-out ${
          isActive ? 'font-bold' : ''
        }  `
      }
    >
      {children}
    </Link>
  )
}
