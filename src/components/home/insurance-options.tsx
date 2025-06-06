import Image from 'next/image'
import Link from 'next/link'

import { ArrowRightCircle } from 'lucide-react'
import { INSURANCE_OPTIONS } from '@/data/static-data'

export default function InsuranceOptions() {
  return (
    <div className="container w-full mx-auto mt-4 md:mt-14 px-4 py-8 ">
      <h2 className="mb-10 md:mb-20 text-center text-2xl md:text-5xl font-platform-medium text-primary">
        Descubre el <span className="text-secondary">seguro</span> que mejor
        <br />
        se adapta a <span className="text-secondary">tus necesidades</span>
      </h2>

      <div className="relative w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
        {INSURANCE_OPTIONS.map((insurance, i) => (
          <div
            key={insurance.id}
            className={` z-0 relative w-full aspect-[5/7] rounded-2xl md:rounded-3xl shadow-md `}
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
            <div className="w-full absolute top-0 left-0 z-20 flex justify-center">
              <div className="w-14 h-14 -translate-y-1/2 bg-secondary text-white p-3 rounded-full">
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
              className={`z-50 w-full h-full absolute top-0 left-0 pb-4 md:pb-6 lg:pb-8 flex flex-col items-center justify-end md:gap-4 lg:gap-6`}
            >
              <h4 className=" p-3 font-platform-medium text-white text-shadow-black text-center text-2xl md:text-3xl lg:text-4xl uppercase">
                {insurance.title}
              </h4>
              <div className=" w-1/2 min-w-[160px] text-white p-2 flex flex-col items-center gap-4">
                <Link
                  href={`/cotizar/${insurance.id}`}
                  className={`${
                    i % 2 === 0
                      ? ' bg-secondary hover:bg-secondary-dark '
                      : ' bg-primary hover:bg-primary-dark '
                  } w-full flex items-center justify-center py-2 text-white font-platform-medium md:text-xl rounded-xl transition-colors`}
                >
                  COTIZAR
                  <ArrowRightCircle className="inline-block ml-2" />
                </Link>
                <Link
                  href={`/seguros/${insurance.id}`}
                  className="w-full flex items-center justify-center py-2 text-white font-platform-medium md:text-xl border border-white rounded-xl hover:underline"
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
