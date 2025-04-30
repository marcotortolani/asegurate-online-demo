import Image from 'next/image'
import { CheckCircleIcon } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden w-full pt-16 pb-6">
      { /* Item Slide */}
      <div className="w-5/6 max-w-screen-md mx-auto  bg-primary grid grid-cols-2 rounded-3xl overflow-hidden">
        {/* Left side */}
        <div className=" w-full px-6 pt-8 pb-4 flex flex-col items-start justify-center gap-8 ">
          <div className=" flex flex-col items-start">
            <p className=" w-fit ml-6 -mb-4 font-platform-regular text-xl text-center text-balance leading-5">
              ¡Descubre las ventajas <br /> de ser cliente de
            </p>
            <Image
              src="/images/logo-AS.webp"
              alt="Logo Asegurate Online"
              className="w-5/6 h-auto"
              width={300}
              height={300}
            />
          </div>

          <ul className=" flex flex-col items-start gap-3 font-platform-regular text-lg">
            <li className="flex items-center gap-3">
              <CheckCircleIcon className="h-5 w-5 text-secondary" />
              <p className=" text-center">
                Hasta <span className=" font-platform-bold">30% OFF</span> en neumáticos.
              </p>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircleIcon className="h-5 w-5 text-secondary" />
              <p className=" text-center">
                <span className=" font-platform-bold">25% de reintegro</span> en tus
                seguros.
              </p>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircleIcon className="h-5 w-5 text-secondary" />
              <p className=" text-center">
                <span className=" font-platform-bold">Asistencia 24hs</span> ante un
                accidente.
              </p>
            </li>
          </ul>

          <div className="w-full flex justify-center">
            <button
              type="button"
              className="bg-secondary px-4 py-1.5 text-white font-platform-bold text-xl uppercase rounded-full"
            >
              Ver beneficios
            </button>
          </div>
        </div>
        {/* Right side */}
        <div className=" relative w-full rounded-[inherit]">
          <div className=" absolute -translate-x-3 bg-primary-grayish/50 w-full aspect-square rounded-[inherit]"></div>
          <div className=" relative w-full aspect-square overflow-hidden rounded-[inherit]">
            <Image
              src="/images/couple-using-laptop.webp"
              alt="Hero image"
              className="w-full h-full object-cover object-bottom"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  )
}
