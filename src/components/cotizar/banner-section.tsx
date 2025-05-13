import Image, { StaticImageData } from 'next/image'

export default function BannerSection({
  text,
  image,
  icon,
}: {
  text: string
  image: StaticImageData
  icon: StaticImageData
}) {
  return (
    <div className="z-0 container mx-auto relative w-full max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-2xl ">
      <div className="z-50 absolute top-0 left-0 w-full flex items-center justify-center ">
        <div className="w-10 h-10 md:w-14 md:h-14 p-2 md:p-3 -translate-y-1/2 flex items-center justify-center bg-secondary text-white rounded-full">
          <Image
            src={icon}
            alt={text}
            width={50}
            height={50}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className=" w-full mx-auto aspect-[14/3] relative rounded-[inherit] overflow-hidden ">
        <Image
          className="w-full h-auto object-cover"
          src={image}
          alt={text}
          fill
        />
        <div className="absolute top-0 left-0 w-full h-full bg-primary/60" />
        <div className=" absolute top-0 flex items-center justify-center w-full h-full">
          <h2 className="w-4/6 space-x-4 text-center text-pretty md:text-3xl font-platform-medium tracking-wide text-white uppercase text-shadow-black ">{text}</h2>
        </div>
      </div>
    </div>
  )
}
