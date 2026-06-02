'use client'
import { useState } from 'react'

import { ManIcon, WomanIcon } from '@/utils/icons'
import { ArrowLeftCircle, SearchIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface PersonalData {
  name: string
  last_name: string
  age: number
  email: string
  phone_type: 'tel' | 'cel'
  phone_area_code: number
  phone_number: number
  zip_code: number
  city_code: number
  identification_number: number
  identification_type: 'D' | 'C' | 'L' | 'I' | 'J'
  city?: string
  province?: string
  gender: 'male' | 'female'
  is_juridic_person: boolean
}

interface Locality {
  cityId: string //'298'
  cityName: string // 'CIUDAD AUTONOMA DE BUENOS AIRES'
  countryCode: string // 'AR'
  countryName: string // 'ARGENTINA'
  stateCode: string // 'AR-C'
  stateName: string // 'Ciudad Autónoma de Buenos Aires'
  zipCode: string // '1427'
}

export default function PersonalInfoForm({
  onBackStep,
  onNextStep,
  data,
  setData,
}: {
  onBackStep: () => void
  onNextStep: () => void
  data: PersonalData
  setData: (data: PersonalData) => void
}) {
  const [postalCode, setPostalCode] = useState(data.zip_code)
  const [localitiesResults, setLocalitiesResults] = useState<Locality[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  console.log(localitiesResults)

  const fetchLocation = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `/api/sancor/localities?zipCode=${postalCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) {
        throw new Error('Error al obtener las localidades')
      }

      const data = await response.json()
      if (data.messages.status !== '200') {
        throw new Error('Error al obtener las localidades')
      }

      setLocalitiesResults(data.localities)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }

    // setData({ ...data, city_code: data.localidades[0].id })
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm max-w-3xl mx-auto">
      {/* Gender selection */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setData({ ...data, gender: 'female' })}
          className={`${
            data.gender === 'female'
              ? ' bg-secondary fill-white hover:scale-105 hover:bg-secondary/80 '
              : ' bg-primary-grayish/70 fill-primary/50 '
          } w-20 h-12 md:h-14 p-2 md:p-3 cursor-pointer rounded-xl transition-all duration-200 ease-in-out`}
        >
          <WomanIcon fill="inherit" />
        </button>
        <button
          type="button"
          onClick={() => setData({ ...data, gender: 'male' })}
          className={`${
            data.gender === 'male'
              ? ' bg-secondary fill-white hover:scale-105 hover:bg-secondary/80 '
              : ' bg-primary-grayish/70 fill-primary/50 hover:scale-105 hover:bg-primary-grayish/80 '
          } w-20 h-12 md:h-14 p-2 md:p-3 cursor-pointer rounded-xl transition-all duration-200 ease-in-out`}
        >
          <ManIcon fill="inherit" />
        </button>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            name="locality"
            id="locality"
            value={postalCode || ''}
            onChange={(e) => setPostalCode(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                fetchLocation()
                setIsDropdownOpen(true)
              }
            }}
            placeholder="Código Postal"
            className="w-full px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-black stroke-3" />
          </div>

          {isDropdownOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {localitiesResults.map((locality) => (
                <li
                  key={locality.cityId + locality.zipCode}
                  onClick={() => {
                    setData({
                      ...data,
                      zip_code: parseInt(locality.zipCode),
                      city_code: parseInt(locality.cityId),
                      city: locality.cityName,
                      province: locality.stateName,
                    })
                    //setPostalCode(parseInt(locality.zipCode))
                    setIsDropdownOpen(false)
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {locality.cityName}
                </li>
              ))}
            </ul>
          )}

          {loading && <p className="text-sm text-gray-500 mt-1">Buscando...</p>}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <input
          type="number"
          placeholder="Edad"
          min={18}
          max={110}
          className="w-full px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
          value={data.age || ''}
          onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
        />

        <input
          type="text"
          placeholder="Nombre"
          className="w-full px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
          value={data.name || ''}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Apellido"
          className="w-full px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
          value={data.last_name || ''}
          onChange={(e) => setData({ ...data, last_name: e.target.value })}
        />

        {/* Identification */}
        <div className=" flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-4/9 md:w-3/4 h-full px-4 md:px-6 py-2 font-platform-regular text-lg md:text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem
                value="D"
                onClick={() => setData({ ...data, identification_type: 'D' })}
              >
                DNI
              </SelectItem>
              <SelectItem
                value="C"
                onClick={() => setData({ ...data, identification_type: 'C' })}
              >
                LC
              </SelectItem>
              <SelectItem
                value="L"
                onClick={() => setData({ ...data, identification_type: 'L' })}
              >
                LE
              </SelectItem>
              <SelectItem
                value="I"
                onClick={() => setData({ ...data, identification_type: 'I' })}
              >
                CI
              </SelectItem>
              <SelectItem
                value="J"
                onClick={() => setData({ ...data, identification_type: 'J' })}
              >
                CUIT
              </SelectItem>
            </SelectContent>
          </Select>
          <input
            type="number"
            placeholder="DNI: 20123123"
            className="w-full px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            value={data.identification_number || ''}
            onChange={(e) =>
              setData({
                ...data,
                identification_number: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="w-full flex flex-col items-start gap-4">
          <div className="pl-2 md:pl-0 mt-2 flex items-center gap-4">
            <label className="flex items-center gap-1">
              <span>Tel</span>
              <input
                type="radio"
                name="phone"
                value="tel"
                className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                onClick={() => setData({ ...data, phone_type: 'tel' })}
              />
            </label>
            <label className="flex items-center gap-1">
              <span>Cel</span>
              <input
                type="radio"
                name="phone"
                value="cel"
                className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                onClick={() => setData({ ...data, phone_type: 'cel' })}
                defaultChecked
              />
            </label>
          </div>
          <div className="w-full flex gap-2">
            <input
              type="text"
              placeholder="11"
              className="w-1/3 px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
              value={data.phone_area_code || ''}
              onChange={(e) =>
                setData({ ...data, phone_area_code: Number(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="1512345678"
              className="w-2/3 px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
              value={data.phone_number || ''}
              onChange={(e) =>
                setData({ ...data, phone_number: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full px-4 md:px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
          value={data.email || ''}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBackStep}
            className=" flex items-center gap-2 bg-neutral-800 uppercase font-platform-medium tracking-wide text-lg cursor-pointer text-white pl-4 pr-8 py-2 rounded-2xl hover:bg-neutral-600 transition-colors"
          >
            <ArrowLeftCircle className=" w-5 h-5" />
            Atrás
          </button>
          <button
            type="button"
            onClick={onNextStep}
            className="bg-primary uppercase font-platform-medium tracking-wide text-lg cursor-pointer text-white px-8 py-2 rounded-2xl hover:bg-primary-dark transition-colors
                        disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-300"
            // disabled={
            //   !data.name ||
            //   !data.last_name ||
            //   !data.identification_type ||
            //   !data.identification_number ||
            //   !data.phone_area_code ||
            //   !data.phone_number ||
            //   !data.email
            // }
          >
            Cotizar
          </button>
        </div>
      </div>
    </div>
  )
}
