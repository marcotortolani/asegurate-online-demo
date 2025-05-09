import Image from 'next/image'

import familyImage from '/public/images/family-draw.webp'

export default function BannerPrevencionSalud() {
  return (
    <div className="container mx-auto px-4 md:px-0 max-w-sm md:max-w-2xl lg:max-w-4xl ">
      <div className="h-28 md:h-40 border-2 border-neutral-400 rounded-[4rem] pt-2 flex items-center justify-around">
        <div className=" text-rose-400">
          <p className=" text-center font-platform-bold text-2xl md:text-5xl">
            Prevención Salud
          </p>
          <p className=" text-center font-platform-medium text-base md:text-xl">
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
