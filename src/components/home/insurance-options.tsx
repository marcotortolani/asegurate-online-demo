import Image from 'next/image'
import Link from 'next/link'

import { ArrowRightCircle } from 'lucide-react'

export default function InsuranceOptions() {
  const insuranceTypes = [
    {
      id: 'autos',
      title: 'AUTOS',
      color: 'bg-blue-900',
      icon: '/icons/Icono_autos.webp',
      image: '/images/man-driving-car.webp',
    },
    {
      id: 'motos',
      title: 'MOTOS',
      color: 'bg-orange-700',
      icon: '/icons/Icono_motos.webp',
      image: '/images/motorcycle-parking-front.webp',
    },
    {
      id: 'hogar',
      title: 'HOGAR',
      color: 'bg-blue-600',
      icon: '/icons/Icono_hogar.webp',
      image: '/images/entrance-residential-house.webp',
    },
    {
      id: 'comercio',
      title: 'COMERCIO',
      color: 'bg-orange-600',
      icon: '/icons/Icono_comercio.webp',
      image: '/images/man-waiting-scanned.webp',
    },
    {
      id: 'art',
      title: 'ART',
      color: 'bg-blue-800',
      icon: '/icons/Icono_art.webp',
      image: '/images/male-wood-worker.webp',
    },
    {
      id: 'accidentes',
      title: 'ACCIDENTES',
      color: 'bg-orange-800',
      icon: '/icons/Icono_Accidentes.webp',
      image: '/images/accident-ambulance.webp',
    },
    {
      id: 'flota',
      title: 'FLOTA',
      color: 'bg-blue-700',
      icon: '/icons/Icono_Flota.webp',
      image: '/images/fleet-delivery-vans.webp',
    },
    {
      id: 'caucion',
      title: 'CAUCIÓN',
      color: 'bg-orange-500',
      icon: '/icons/Icono_caucion.webp',
      image: '/images/handshake-business-partners.webp',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h2 className="mb-20 text-center text-3xl font-platform-medium text-primary">
        Descubre el <span className="text-secondary">seguro</span> que mejor
        <br />
        se adapta a <span className="text-secondary">tus necesidades</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
        {insuranceTypes.map((insurance, i) => (
          <div
            key={insurance.id}
            className={` z-0 relative aspect-[5/7] rounded-3xl shadow-md `}
          >
            <div className="absolute z-0 inset-0 rounded-[inherit] overflow-hidden">
              <Image
                src={insurance.image}
                alt={insurance.title}
                className="absolute object-center object-cover w-full h-full"
                fill
              />
              <div
                className={`${
                  i % 2 === 0 ? ' bg-primary/50 ' : ' bg-secondary/50  '
                }  absolute z-10 inset-0 `}
              ></div>
            </div>
            <div className="w-full absolute top-0 left-1/2 z-20 ">
              <div className="w-14 h-14 -translate-x-1/2 -translate-y-1/2  bg-secondary text-white p-3 rounded-full">
                <Image
                  src={insurance.icon}
                  alt={insurance.title}
                  className="w-full h-full"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            <div
              className={`z-50 w-full h-full absolute top-0 left-0 -translate-y-1/4 flex flex-col items-center justify-end gap-4`}
            >
              <h4 className=" p-3 font-platform-medium text-white text-shadow-black text-center text-4xl uppercase">
                {insurance.title}
              </h4>
              <div className=" w-1/2 text-white p-2 flex flex-col items-center gap-4">
                <Link
                  href={`/cotizar/${insurance.id}`}
                  className={`${
                    i % 2 === 0
                      ? ' bg-secondary hover:bg-secondary-dark '
                      : ' bg-primary hover:bg-primary-dark '
                  } w-full flex items-center justify-center py-2 text-white font-platform-medium text-xl rounded-xl transition-colors`}
                >
                  COTIZAR
                  <ArrowRightCircle className="inline-block ml-2" />
                </Link>
                <Link
                  href={`/seguros/${insurance.id}`}
                  className="w-full flex items-center justify-center py-2 text-white font-platform-medium text-xl border border-white rounded-xl hover:underline"
                >
                  ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
