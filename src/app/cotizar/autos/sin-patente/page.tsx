'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import 'swiper/css/pagination'

import TitleSection from '@/components/title-section'

import PersonalInfoForm from '@/components/cotizar/sin-patente/form-personal-data'
import VehicleForm from '@/components/cotizar/sin-patente/form-vehicle-data'
import QuoteResults from '@/components/cotizar/sin-patente/quote-results'

import { QuoteResultsProps } from '@/components/cotizar/sin-patente/quote-results'

import { PersonalData } from '@/components/cotizar/sin-patente/form-personal-data'

import { CarInfo, PersonalDataIcon, CreditCard } from '@/utils/icons'

const options = ['vehicle-form', 'personal-info-form', 'quote-results'] as const
type OptionSelected = (typeof options)[number]

export default function Page() {
  const router = useRouter()
  const [optionSelected, setOptionSelected] =
    useState<OptionSelected>('vehicle-form')
  const swiperRef = useRef<SwiperType | null>(null)

  const [vehicleData, setVehicleData] = useState<{
    brand_id: number
    brand_name: string
    model: string
    model_id: number
    year: number
    version: string
    codia: number
    hasGnc: boolean
    isZeroKm: boolean
  } | null>(null)

  const [personalData, setPersonalData] = useState<PersonalData>({
    name: '',
    last_name: '',
    age: 0,
    email: '',
    phone_type: 'cel',
    phone_area_code: 0,
    phone_number: 0,
    identification_number: 0,
    identification_type: 'D',
    city: '',
    province: '',
    zip_code: 0, // 1427
    city_code: 0, //
    gender: 'male',
    is_juridic_person: false,
  })

  const [quotesData, setQuotesData] = useState<QuoteResultsProps[]>([])

  console.log('vehicleData: --> ', vehicleData)
  console.log('personalData: --> ', personalData)
  console.log('quotesData: --> ', quotesData)

  // const fetchPolicies = async () => {
  //   try {
  //     const response = await fetch('/api/sancor/policies', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })

  //     if (!response.ok) {
  //       throw new Error('Error al obtener las pólizas')
  //     }

  //     const data = await response.json()
  //     console.log('data policies: ', data)

  //     return data
  //   } catch (error) {
  //     console.error('Error al obtener las pólizas:', error)
  //     return []
  //   }
  // }

  const fetchQuotations = async () => {
    try {
      const response = await fetch('/api/sancor/quotation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al obtener las cotizaciones')
      }

      const data = await response.json()
      console.log('data quotations: ', data)

      setQuotesData(data)

      return data
    } catch (error) {
      console.error('Error al obtener las cotizaciones:', error)
      return []
    }
  }

  useEffect(() => {
    async function initializeTokens() {
      try {
        const response = await fetch('/api/initialize-tokens', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          console.error(
            'Error al inicializar los tokens:',
            await response.text(),
          )
          return
        }

        // Redirigir a la página deseada después de inicializar los tokens
        router.replace('/cotizar/autos/sin-patente')
      } catch (error) {
        console.error('Error al inicializar los tokens:', error)
      }
    }

    initializeTokens()
  }, [router])

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
    <div className="relative z-0 container mx-auto h-full p-0 md:p-6 mt-10 ">
      <TitleSection title="Cotiza sin la patente de tu auto" />

      {/* Form & Selector */}
      <div className=" z-40 relative w-full max-w-2xl lg:max-w-3xl mx-auto h-fit overflow-hidden p-2 md:p-4 bg-slate-200 shadow-black/60 shadow-lg rounded-3xl">
        {/* Step indicators */}
        <div className="px-4 mb-8 flex items-center justify-center gap-4">
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
            // disabled={!vehicleData?.codia}
          >
            <PersonalDataIcon fill="inherit" />
          </ButtonOption>
          <ButtonOption
            option={'quote-results'}
            isActive={optionSelected === 'quote-results'}
            onOptionSelected={setOptionSelected}
            // disabled={
            //   !personalData?.identification_number ||
            //   !personalData?.identification_type ||
            //   !personalData?.zip_code ||
            //   !personalData?.city_code
            // }
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
          <SwiperSlide key="vehicle-form">
            <VehicleForm
              onNextStep={() => setOptionSelected('personal-info-form')}
              setData={setVehicleData}
            />
          </SwiperSlide>
          <SwiperSlide key="personal-info-form">
            <PersonalInfoForm
              onBackStep={() => setOptionSelected('vehicle-form')}
              onNextStep={() => {
                setOptionSelected('quote-results')
                fetchQuotations()
                // fetchPolicies()
              }}
              data={personalData}
              setData={setPersonalData}
            />
          </SwiperSlide>
          <SwiperSlide key="quote-results">
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
          <Link
            href="/autoinspeccion"
            className=" px-4 py-2  cursor-pointer transition-colors bg-primary hover:bg-primary-grayish font-platform-medium tracking-wide text-xl uppercase text-white rounded-2xl"
          >
            Autoinspección
          </Link>
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
