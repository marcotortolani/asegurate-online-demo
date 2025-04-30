import { Facebook, Instagram, MessageSquare, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white font-platform-regular py-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Horario de atención */}
          <div className=" text-lg">
            <p className="">Horario de atención en nuestras oficinas</p>
            <p>De Lunes a Viernes</p>
            <p>De 09:00 a 17:00 hs.</p>
            <p>Sábados de 10:00 a 18:00 hs.</p>
          </div>

          {/* Enlaces */}
          <div className="flex flex-col items-center">
            <div className="space-y-2 mb-6">
              <Link href="/" className="block hover:text-gray-300">
                Inicio
              </Link>
              <Link href="/quienes-somos" className="block hover:text-gray-300">
                ¿Quiénes somos?
              </Link>
              <Link href="/contacto" className="block hover:text-gray-300">
                Contacto
              </Link>
              <Link
                href="/arrepentimiento"
                className="block hover:text-gray-300"
              >
                Botón de arrepentimiento
              </Link>
            </div>

            {/* Redes sociales */}
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-300">
                <MessageSquare className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-gray-300">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center md:justify-end items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Asegurate Online</span>
              <span className="text-secondary ml-1">★</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
