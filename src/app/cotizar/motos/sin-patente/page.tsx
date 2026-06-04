'use client'
import { useState, useRef, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/pagination'

import TitleSection from '@/components/title-section'

import PersonalInfoForm from '@/components/cotizar/motos/form-personal-data'
import VehicleForm from '@/components/cotizar/motos/form-vehicle-data'
import QuoteResults from '@/components/cotizar/sin-patente/quote-results'

import { MotoInfo, PersonalDataIcon, CreditCard } from '@/utils/icons'

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
  }, [optionSelected])

  return (
    <div className="relative z-0 container mx-auto h-full p-0 md:p-6 mt-10 ">
      <TitleSection title="Cotiza sin la patente de tu moto" />

      {/* Form & Selector */}
      <div className=" z-40 relative w-full max-w-2xl lg:max-w-3xl mx-auto h-fit overflow-hidden p-2 md:p-4 bg-slate-200 shadow-black/60 shadow-lg rounded-3xl">
        {/* Step indicators */}
        <div className=" px-4 mb-8 flex items-center justify-center gap-4">
          <ButtonOption
            option={'vehicle-form'}
            isActive={optionSelected === 'vehicle-form'}
            onOptionSelected={setOptionSelected}
          >
            <MotoInfo fill="inherit" />
          </ButtonOption>
          <ButtonOption
            option={'personal-info-form'}
            isActive={optionSelected === 'personal-info-form'}
            onOptionSelected={setOptionSelected}
          >
            <PersonalDataIcon fill="inherit" />
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
          autoHeight
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            const next = options[swiper.activeIndex]
            if (next) setOptionSelected(next)
          }}
        >
          <SwiperSlide key="vehicle-form">
            <VehicleForm
              onNextStep={() => setOptionSelected('personal-info-form')}
            />
          </SwiperSlide>
          <SwiperSlide key="personal-info-form">
            <PersonalInfoForm
              onBackStep={() => setOptionSelected('vehicle-form')}
              onNextStep={() => setOptionSelected('quote-results')}
            />
          </SwiperSlide>
          <SwiperSlide key="quote-results">
            <QuoteResults />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

const ButtonOption = ({
  option,
  isActive,
  onOptionSelected,
  children,
  disabled,
}: {
  option: OptionSelected
  isActive: boolean
  onOptionSelected: (option: OptionSelected) => void
  children: React.ReactNode
  disabled?: boolean
}) => {
  return (
    <button
      type="button"
      onClick={() => onOptionSelected(option)}
      disabled={disabled}
      className={`${
        isActive
          ? ' bg-secondary text-white fill-white '
          : ' bg-primary-grayish/60 text-primary fill-primary '
      } w-full h-12 md:h-14 flex-1 py-3 rounded-xl md:rounded-2xl flex justify-center items-center cursor-pointer transition-colors
         disabled:cursor-not-allowed disabled:opacity-50 `}
    >
      {children}
    </button>
  )
}
