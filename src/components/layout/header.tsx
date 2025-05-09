'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { Menu, User, ChevronRight, XIcon } from 'lucide-react'
import NavLink from '../ui/NavLink'

export default function Header() {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lowerPosition, setLowerPosition] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY

    if (scrollPosition > lowerPosition + 100) {
      setLowerPosition(scrollPosition)
      setIsNavbarVisible(false)
      setIsMenuOpen(false)
    }
    if (scrollPosition + 50 <= lowerPosition) {
      setLowerPosition(scrollPosition)
      setIsNavbarVisible(true)
    }
  }, [lowerPosition])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // click outside menuref
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header
      className={`${
        isNavbarVisible ? 'top-0 ' : ' -top-44 lg:-top-[10.5rem]  '
      } fixed  z-50 w-screen h-20 py-5 px-4 lg:px-6 bg-primary border-b-4 border-b-secondary text-white flex items-center justify-between transition-all duration-300 ease-in-out`}
    >
      <div className="relative w-full md:max-w-screen-md lg:max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Logo - Mobile */}
        <div className=" w-full lg:w-fit flex items-center justify-between">
          <button
            className="md:mr-4 lg:hidden"
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
          <NavLink
            href="/ingresar"
            className="lg:hidden bg-transparent hover:bg-primary-dark pr-0 md:pr-0 flex items-center text-white md:border-[1px] md:border-white  hover:text-gray-200 "
          >
            <span className=" hidden md:flex">Ingresar</span>
            <User className=" md:ml-2 md:-mr-0.5 h-full w-auto aspect-square border-2 border-white rounded-full" />
          </NavLink>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-2 lg:gap-6">
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
            className="bg-transparent hover:bg-primary-dark pr-0 md:pr-0 flex items-center text-white border-[1px] border-white  hover:text-gray-200 "
          >
            Ingresar
            <User className=" ml-2 -mr-0.5 h-full w-auto aspect-square border-2 border-white rounded-full" />
          </NavLink>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? ' translate-x-0 ' : ' -translate-x-full'
        } absolute top-24 left-0 w-fit bg-secondary-dark/80 backdrop-blur-xl z-50 border-2 border-white border-l-0 rounded-r-4xl overflow-hidden transition-all duration-200 ease-in-out`}
      >
        <div className=" pl-2 pr-6 py-3 flex items-center gap-4 bg-primary">
          <button type="button" onClick={() => setIsMenuOpen(false)}>
            <XIcon className="h-8 w-8 stroke-2 text-white" />
          </button>
          <Image
            src="/images/logo-AS-white.webp"
            alt="Logo Asegurate Online"
            width={100}
            height={100}
            className="h-10 w-auto"
          />
        </div>
        <div className="flex flex-col p-4 ">
          <nav className="w-full py-4 flex flex-col items-start gap-6 ">
            <NavLink
              href="/ingresar"
              className="bg-transparent pl-4 hover:bg-primary-dark pr-0 md:pr-0 flex items-center text-white border-[1px] border-white  hover:text-gray-200 "
            >
              Ingresar
              <User className=" ml-2 -mr-0.5 h-8 w-auto aspect-square border-2 border-white rounded-full" />
            </NavLink>
            <NavLink href="/quienes-somos" className=" px-4 py-1 rounded-2xl">
              ¿Quiénes somos?
            </NavLink>

            <NavLink
              href="/nuestros-seguros"
              className=" px-4 py-1 rounded-2xl"
            >
              Nuestros Seguros
              <ChevronRight className="ml-1 -mr-2 h-4 w-4" />
            </NavLink>
            <NavLink
              href="/cotiza"
              className=" px-4 py-1 rounded-2xl uppercase font-semibold  "
            >
              Cotiza tu seguro
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
