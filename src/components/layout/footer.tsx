import Image from 'next/image'
import Link from 'next/link'
import NavLink from '../ui/NavLink'

export default function Footer() {
  return (
    <footer className="mt-20 pb-20 text-white font-platform-regular">
      <div className=" bg-primary py-8 px-6">
        <div className="container mx-auto ">
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
                    alt="Icono whatsapp"
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
                    alt="Icono instagram"
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
                    alt="Icono facebook"
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
                    alt="Icono X"
                    className="w-full h-auto"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto h-fit py-10 lg:px-4 flex flex-col items-start gap-8 bg-white font-normal font-sans text-neutral-400  ">
        <div className="w-full py-4 flex flex-col md:flex-row md:flex-wrap items-center justify-around gap-6 border-t-2 border-gray-200">
          <div className=" ">
            <p className="text-center text-sm">Nº de inscripción en SSN</p>
            <p className="text-center text-sm">102781</p>
          </div>
          <div className="w-32 h-0.5 md:w-0.5 md:h-10 bg-neutral-400/60" />
          <div className=" ">
            <p className="text-center text-sm">Atención al asegurado</p>
            <p className="text-center text-sm">0800-666-8400</p>
          </div>
          <div className="w-32 h-0.5 md:w-0.5 md:h-10 bg-neutral-400/60" />
          <div className=" ">
            <p className="text-center text-sm font-semibold text-neutral-500">
              Organismo de control
            </p>
          </div>
          <div className="w-32 h-0.5 md:w-0.5 md:h-10 bg-neutral-400/60" />
          <div className=" ">
            <p className="text-center text-sm font-semibold text-neutral-500">
              <Link
                href="https://www.argentina.gob.ar/ssn"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.argentina.gob.ar/ssn
              </Link>
            </p>
          </div>
          <div className="w-32 h-0.5 md:w-0.5 md:h-10 bg-neutral-400/60" />
          <div className="p-2">
            <Image
              className="w-[300px] h-auto"
              src="/SSN_Argentina_logo.png"
              alt="Logo SSN"
              width={650}
              height={108}
            />
          </div>
        </div>
        <div className=" px-4 flex flex-col items-start gap-6 text-neutral-500/80">
          <p>
            La compañía de seguros dispone de un Servicio de Atención al
            Asegurado que atenderá las consultas y reclamos que presenten los
            tomadores de seguros, asegurados, beneficiarios y/o
            derechohabientes.
          </p>
          <p>
            En caso de que el reclamo no haya sido resuelto o que haya sido
            denegada su admisión o desestimado, total o parcialmente, podrá
            comunicarse con la Superintendencia de Seguros de la Nación por
            teléfono al 0800 666 8400, correo electrónico a denuncias@ssn.gob.ar
            o por formulario web.
          </p>
          <p>
            El Servicio de Atención al Asegurado está integrado por: <br />
            RESPONSABLE: Miriam Noemí Luna
            <br />
          </p>
        </div>
      </div>
    </footer>
  )
}
