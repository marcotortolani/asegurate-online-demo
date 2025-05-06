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
    <div className="relative overflow-hidden w-full pt-16 pb-6">
      <Swiper
        grabCursor={true}
        loop={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay]}
        breakpoints={{
          640: {
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            centeredSlides: true,
            slidesPerView: 1.5,
            spaceBetween: 50,
          },
          1280: {
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
      className={` ${bgColor} w-full max-w-screen-lg mx-auto grid grid-cols-2 rounded-4xl overflow-hidden`}
    >
      {/* Left side */}
      <div className=" w-full px-6 pt-8 pb-4 flex flex-col items-start justify-center gap-8 ">
        <div className=" flex flex-col items-start">
          <p className=" w-fit ml-7 -mb-2 font-platform-regular text-3xl text-center text-balance leading-7">
            ¡Descubre las ventajas <br /> de ser cliente de
          </p>
          <Image
            src="/images/logo-AS.webp"
            alt="Logo Asegurate Online"
            className="w-full h-auto"
            width={300}
            height={300}
          />
        </div>

        <ul className=" flex flex-col items-start gap-3 font-platform-regular text-2xl">
          <li className="flex items-center gap-3">
            <CheckCircleIcon className="h-6 w-6 text-secondary" />
            <p className=" text-center">
              Hasta <span className=" font-platform-bold">30% OFF</span> en
              neumáticos.
            </p>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircleIcon className="h-6 w-6 text-secondary" />
            <p className=" text-center">
              <span className=" font-platform-bold">25% de reintegro</span> en
              tus seguros.
            </p>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircleIcon className="h-6 w-6 text-secondary" />
            <p className=" text-center">
              <span className=" font-platform-bold">Asistencia 24hs</span> ante
              un accidente.
            </p>
          </li>
        </ul>

        <div className="w-full flex justify-center">
          <button
            type="button"
            className="bg-secondary px-4 py-1.5 text-white font-platform-bold text-2xl uppercase rounded-full"
          >
            Ver beneficios
          </button>
        </div>
      </div>
      {/* Right side */}
      <div className=" relative w-full rounded-[inherit]">
        <div className=" absolute -translate-x-5 bg-primary-grayish/50 w-full aspect-square rounded-[inherit]"></div>
        <div className=" relative w-full aspect-square overflow-hidden rounded-[inherit]">
          <Image
            src={image}
            alt="Hero image"
            className="w-full h-full object-cover object-bottom"
            fill
          />
        </div>
      </div>
    </div>
  )
}
