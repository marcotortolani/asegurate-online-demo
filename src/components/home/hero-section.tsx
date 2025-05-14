'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { CheckCircleIcon } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'

type ItemSlideProps = {
  image: string
  bgColor: string
}

const ITEMS_SLIDE: ItemSlideProps[] = [
  {
    image: '/images/couple-using-laptop.webp',
    bgColor: 'bg-primary',
  },
  {
    image: '/images/car-traveling-driving.webp',
    bgColor: 'bg-neutral-500',
  },
  {
    image: '/images/entrance-residential-house.webp',
    bgColor: 'bg-neutral-800',
  },
]

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden w-full pt-6 md:pt-16 pb-6">
      <Swiper
        grabCursor={true}
        loop={true}
        speed={2500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
          reverseDirection: true,
          waitForTransition: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            centeredSlides: true,
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          640: {
            centeredSlides: true,
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          768: {
            centeredSlides: true,
            slidesPerView: 1.25,
            spaceBetween: 30,
          },
          1024: {
            centeredSlides: true,
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          1280: {
            centeredSlides: true,
            slidesPerView: 1.25,
            spaceBetween: 50,
          },
          1536: {
            centeredSlides: true,
            slidesPerView: 1.5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {ITEMS_SLIDE.map((item, index) => (
          <SwiperSlide key={index}>
            <ItemSlide item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const ItemSlide = ({ item }: { item: ItemSlideProps }) => {
  const { image, bgColor } = item

  return (
    <div
      className={` ${bgColor} w-full max-w-screen-lg h-[80dvh] max-h-[600px] md:max-h-[750px] xl:h-auto xl:max-h-[650px] mx-auto grid grid-col-1 grid-rows-5 lg:grid-cols-2 lg:grid-rows-1 rounded-2xl lg:rounded-4xl overflow-hidden`}
    >
      {/* Left side */}
      <div
        className={` row-span-3 ${bgColor} lg:bg-transparent z-20 w-full h-full -mt-2 px-6 pt-8 pb-4 text-white flex flex-col items-start justify-center gap-4 md:gap-8 rounded-[inherit]`}
      >
        <div className=" w-full flex flex-col-reverse items-center lg:flex-col lg:items-start">
          <p className=" hidden md:block w-fit ml-7 -mb-2 font-platform-regular text-3xl leading-7 text-center text-balance">
            ¡Descubre las ventajas <br /> de ser cliente de
          </p>
          <p className="md:hidden w-fit mt-2 font-platform-medium text-xl leading-5 text-center text-balance">
            ¡Descubre las ventajas de ser nuestro cliente!
          </p>
          <Image
            src="/images/logo-AS.webp"
            alt="Logo Asegurate Online"
            className="w-full max-w-[160px] lg:max-w-max h-auto"
            width={300}
            height={300}
          />
        </div>

        <ul className=" flex flex-col items-start md:gap-3 font-platform-regular md:text-2xl">
          <li className="flex items-center gap-3">
            <CheckCircleIcon className="h-4 w-4 md:h-6 md:w-6 text-secondary" />
            <p className=" text-center">
              Hasta <span className=" font-platform-bold">30% OFF</span> en
              neumáticos.
            </p>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircleIcon className="h-4 w-4 md:h-6 md:w-6 text-secondary" />
            <p className=" text-center">
              <span className=" font-platform-bold">25% de reintegro</span> en
              tus seguros.
            </p>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircleIcon className="h-4 w-4 md:h-6 md:w-6 text-secondary" />
            <p className=" text-center">
              <span className=" font-platform-bold">Asistencia 24hs</span> ante
              un accidente.
            </p>
          </li>
        </ul>

        <div className="w-full flex justify-center">
          <button
            type="button"
            className="bg-secondary px-4 py-1.5 cursor-pointer hover:bg-secondary-dark hover:scale-105 active:scale-100 text-white font-platform-bold md:text-2xl uppercase rounded-full transition-all duration-200 ease-in-out"
          >
            Ver beneficios
          </button>
        </div>
      </div>
      {/* Right side */}
      <div className=" row-span-2 row-start-1 lg:row-auto relative w-full rounded-[inherit]">
        <div className=" absolute hidden md:block -translate-x-5 bg-primary-grayish/50 w-full h-full lg:aspect-square rounded-[inherit]"></div>
        <div className=" relative w-full h-full lg:aspect-square overflow-hidden lg:rounded-[inherit]">
          <Image
            src={image}
            alt="Hero image"
            className="w-full h-full object-cover object-center lg:object-bottom"
            fill
          />
        </div>
      </div>
    </div>
  )
}
