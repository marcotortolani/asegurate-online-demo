'use client'
import { useState } from 'react'
import { ManIcon, WomanIcon } from '@/utils/icons'
import { ArrowLeftCircle } from 'lucide-react'

export default function PersonalInfoForm({
  onBackStep,
  onNextStep,
}: {
  onBackStep: () => void
  onNextStep: () => void
}) {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm max-w-3xl mx-auto">
      {/* Gender selection */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setGender('female')}
          className={`${
            gender === 'female'
              ? ' bg-secondary fill-white hover:scale-105 hover:bg-secondary/80 '
              : ' bg-primary-grayish/70 fill-primary/50 '
          } w-20 h-14 p-3 cursor-pointer rounded-xl transition-all duration-200 ease-in-out`}
        >
          <WomanIcon fill="inherit" />
        </button>
        <button
          type="button"
          onClick={() => setGender('male')}
          className={`${
            gender === 'male'
              ? ' bg-secondary fill-white hover:scale-105 hover:bg-secondary/80 '
              : ' bg-primary-grayish/70 fill-primary/50 hover:scale-105 hover:bg-primary-grayish/80 '
          } w-20 h-14 p-3 cursor-pointer rounded-xl transition-all duration-200 ease-in-out`}
        >
          <ManIcon fill="inherit" />
        </button>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Código Postal"
          className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
        />

        <input
          type="number"
          placeholder="Edad"
          min={18}
          max={110}
          className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
        />

        <input
          type="text"
          placeholder="Nombre"
          className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
        />

        <input
          type="text"
          placeholder="Apellido"
          className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
        />

        <div className="w-full flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <span>Tel</span>
              <input
                type="radio"
                name="phone"
                value="tel"
                className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
              />
            </label>
            <label className="flex items-center gap-1">
              <span>Cel</span>
              <input
                type="radio"
                name="phone"
                value="cel"
                className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                defaultChecked
              />
            </label>
          </div>
          <div className="w-full flex gap-2">
            <input
              type="text"
              placeholder="Cod. Área"
              className="w-1/3 px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            />
            <input
              type="text"
              placeholder="1512345678"
              className="w-2/3 px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            />
          </div>
        </div>

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
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
            className="bg-primary uppercase font-platform-medium tracking-wide text-lg cursor-pointer text-white px-8 py-2 rounded-2xl hover:bg-primary-dark transition-colors"
          >
            Cotizar
          </button>
        </div>
      </div>
    </div>
  )
}
