'use client'
import { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'

import 'swiper/css'
import 'swiper/css/pagination'

import TitleSection from '@/components/title-section'

import PersonalInfoForm from '@/components/cotizar/sin-patente/form-personal-data'
import VehicleForm from '@/components/cotizar/sin-patente/form-vehicle-data'
import QuoteResults from '@/components/cotizar/sin-patente/quote-results'

import { CarInfo, PersonalData, CreditCard } from '@/utils/icons'
import Image from "next/image"

const options = ['vehicle-form', 'personal-info-form', 'quote-results'] as const
type OptionSelected = (typeof options)[number]

export default function Page() {
  const [optionSelected, setOptionSelected] =
    useState<OptionSelected>('vehicle-form')
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const index = options.indexOf(optionSelected)
    if (index !== -1) {
      swiperRef.current?.slideTo(index)
    }
    // return () => {
    //   swiperRef.current?.destroy()
    // }
  }, [optionSelected])

  return (
    <div className="relative z-0 container mx-auto h-full p-6 mt-10 ">
      <TitleSection title="Cotiza sin la patente de tu auto" />

      {/* Form & Selector */}
      <div className=" z-40 relative w-full max-w-2xl lg:max-w-3xl mx-auto h-fit overflow-hidden p-4 bg-slate-200 shadow-black/60 shadow-lg rounded-3xl">
        {/* Step indicators */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <ButtonOption
            option={'vehicle-form'}
            isActive={optionSelected === 'vehicle-form'}
            onOptionSelected={setOptionSelected}
          >
            <CarInfo fill="inherit" />
          </ButtonOption>
          <ButtonOption
            option={'personal-info-form'}
            isActive={optionSelected === 'personal-info-form'}
            onOptionSelected={setOptionSelected}
          >
            <PersonalData fill="inherit" />
          </ButtonOption>
          <ButtonOption
            option={'quote-results'}
            isActive={optionSelected === 'quote-results'}
            onOptionSelected={setOptionSelected}
          >
            <CreditCard fill="inherit" />
          </ButtonOption>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          speed={1000}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const next = options[swiper.activeIndex]
            if (next) setOptionSelected(next)
          }}
        >
          <SwiperSlide>
            <VehicleForm
              onNextStep={() => setOptionSelected('personal-info-form')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <PersonalInfoForm
              onBackStep={() => setOptionSelected('vehicle-form')}
              onNextStep={() => setOptionSelected('quote-results')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <QuoteResults />
          </SwiperSlide>
        </Swiper>
      </div>

      <div
        className={`${
          optionSelected === 'quote-results'
            ? ' translate-y-0  '
            : ' -translate-y-[200%] '
        } z-0 w-full transition-all duration-300 ease-in-out`}
      >
        <div className=" w-3/4 mx-auto max-w-lg lg:max-w-xl h-0.5 mt-10 bg-secondary" />
        <div className=" w-2/3 mx-auto mt-10 flex flex-col items-center gap-6">
          <Image
            className="w-full max-w-[200px] lg:max-w-[300px] h-auto -mb-10 "
            src="/images/requirements/auto-2d-frente-01.webp"
            alt="Logo Asegurate Online"
            width={300}
            height={100}
          />
          <p className="text-center text-balance font-platform-medium text-3xl tracking-wide text-primary ">
            ¿Quieres{' '}
            <span className=" text-secondary">hacer una autoinspección</span> de
            tu vehículo?
          </p>
          <button className=" px-4 py-2  cursor-pointer transition-colors bg-primary hover:bg-primary-grayish font-platform-medium tracking-wide text-xl uppercase text-white rounded-2xl">
            Autoinspección
          </button>
        </div>
      </div>
    </div>
  )
}

const ButtonOption = ({
  option,
  isActive,
  onOptionSelected,
  children,
}: {
  option: OptionSelected
  isActive: boolean
  onOptionSelected: (option: OptionSelected) => void
  children: React.ReactNode
}) => {
  return (
    <button
      type="button"
      onClick={() => onOptionSelected(option)}
      className={`${
        isActive
          ? ' bg-secondary text-white fill-white '
          : ' bg-primary-grayish/60 text-primary fill-primary '
      } w-full h-14 flex-1 py-3 rounded-2xl flex justify-center items-center cursor-pointer transition-colors`}
    >
      {children}
    </button>
  )
}
