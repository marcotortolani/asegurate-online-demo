import Image from 'next/image'
import Link from 'next/link'
import NavLink from '../ui/NavLink'

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary text-white font-platform-regular py-8 px-6">
      <div className="container mx-auto">
        <div className=" flex flex-col  gap-8">
          <div className=" flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
            {/* Horario de atención */}
            <div className=" flex flex-col gap-2 text-xl">
              <p className="">Horario de atención en nuestras oficinas</p>
              <div className=" flex flex-col items-start gap-0">
                <p>De Lunes a Viernes</p>
                <p>De 09:00 a 17:00 hs.</p>
                <p>Sábados de 10:00 a 18:00 hs.</p>
              </div>
              <p className=" mt-4">Buenos Aires - Argentina</p>
            </div>
            {/* Logo */}

            <Link href="/" className="w-full max-w-[200px]">
              <Image
                src="/images/logo-AS.webp"
                alt="Logo Asegurate Online"
                className="w-full h-auto"
                width={300}
                height={300}
              />
            </Link>
          </div>

          <div className=" w-full h-1 bg-white rounded-full"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Enlaces */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-6 ">
              <NavLink
                href="/"
                className=" w-fit px-4 py-2 md:px-6 md:py-4 md:text-lg rounded-xl hover:text-gray-300"
              >
                Inicio
              </NavLink>
              <NavLink
                href="/quienes-somos"
                className=" w-fit px-4 py-2 md:px-6 md:py-4 md:text-lg rounded-xl hover:text-gray-300"
              >
                ¿Quiénes somos?
              </NavLink>
              <NavLink
                href="/contacto"
                className=" w-fit px-4 py-2 md:px-6 md:py-4 md:text-lg rounded-xl hover:text-gray-300"
              >
                Contacto
              </NavLink>
              <NavLink
                href="/arrepentimiento"
                className=" w-fit px-4 py-2 md:px-6 md:py-4 md:text-lg rounded-xl hover:text-gray-300"
              >
                Botón de arrepentimiento
              </NavLink>
            </div>

            {/* Redes sociales */}
            <div className="px-4 flex flex-row gap-10">
              <Link
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-all duration-200 ease-in-out"
              >
                <Image
                  src="/icons/Icono_whatsapp.webp"
                  alt="Logo Asegurate Online"
                  className="w-full h-auto"
                  width={100}
                  height={100}
                />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-all duration-200 ease-in-out"
              >
                <Image
                  src="/icons/Icono_instagram.webp"
                  alt="Logo Asegurate Online"
                  className="w-full h-auto"
                  width={100}
                  height={100}
                />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-all duration-200 ease-in-out"
              >
                <Image
                  src="/icons/Icono_facebook.webp"
                  alt="Logo Asegurate Online"
                  className="w-full h-auto"
                  width={100}
                  height={100}
                />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 transition-all duration-200 ease-in-out"
              >
                <Image
                  src="/icons/Icono_x.webp"
                  alt="Logo Asegurate Online"
                  className="w-full h-auto"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
