import Image from 'next/image'

import familyImage from '/public/images/family-draw.webp'

export default function BannerPrevencionSalud() {
  return (
    <div className="container mx-auto max-w-2xl ">
      <div className="border-2 border-neutral-400 rounded-[2.5rem] pt-2 flex items-center justify-around">
        <div className=" text-rose-400">
          <p className=" text-center font-platform-bold text-3xl">
            Prevención Salud
          </p>
          <p className=" text-center font-platform-medium text-base">
            de SANCOS SEGUROS
          </p>
        </div>
        <div className=" h-full">
          <Image
            src={familyImage}
            alt="Familia"
            width={100}
            height={80}
            className="h-full w-auto"
          />
        </div>
      </div>
    </div>
  )
}
