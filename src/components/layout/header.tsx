'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { Menu, User, ChevronRight } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  console.log(pathname)

  return (
    <header className="relative w-full bg-primary border-b-4 border-b-secondary text-white py-5 px-0 flex items-center justify-between">
      <div className=" w-full md:max-w-screen-md lg:max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className=" flex items-center">
          <button
            className="mr-4 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-AS.webp"
              alt="Logo Asegurate Online"
              width={100}
              height={100}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-6">
          <NavLink
            href="/cotiza"
            className="bg-secondary hover:bg-secondary-dark uppercase font-semibold  "
          >
            Cotiza tu seguro
          </NavLink>
          <NavLink href="/quienes-somos">¿Quiénes somos?</NavLink>

          <NavLink href="/nuestros-seguros">
            Nuestros Seguros
            <ChevronRight className="ml-1 -mr-2 h-4 w-4" />
          </NavLink>
          <NavLink
            href="/ingresar"
            className="bg-transparent hover:bg-primary-dark pr-0 flex items-center text-white border-[1px] border-white  hover:text-gray-200 "
          >
            Ingresar
            <User className=" ml-2 -mr-0.5 h-full w-auto aspect-square border-2 border-white rounded-full" />
          </NavLink>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-primary z-50 ">
          <div className="flex flex-col p-4 space-y-4">
            <Link
              href="/cotiza"
              className="bg-secondary text-white px-4 py-2 rounded-md text-center hover:bg-secondary-dark transition-colors"
            >
              Cotiza tu seguro
            </Link>

            <Link
              href="/quienes-somos"
              className="text-white hover:text-gray-200 py-2"
            >
              Quiénes somos
            </Link>
            <Link
              href="/nuestros-seguros"
              className="text-white hover:text-gray-200 py-2"
            >
              Nuestros Seguros
            </Link>
            <Link
              href="/ingresar"
              className="flex items-center justify-center text-white hover:text-gray-200 py-2"
            >
              Ingresar
              <User className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={
        className +
        ` bg-primary-grayish hover:bg-primary-dark text-white px-4 md:h-6 lg:h-8 flex items-center justify-center font-medium md:text-xs lg:text-sm text-center rounded-full hover:text-gray-200 transition-all duration-200 ease-in-out ${
          isActive ? 'font-bold' : ''
        }  `
      }
    >
      {children}
    </Link>
  )
}
