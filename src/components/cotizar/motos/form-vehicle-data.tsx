'use client'
import { SearchIcon, ChevronDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Maqueta: datos estáticos de ejemplo (sin consumo de API)
const MOCK_MODELS = ['CG 150', 'XR 250', 'YBR 125', 'ZB 110', 'Rouser 200']
const MOCK_VERSIONS = ['Base', 'Titan', 'Full', 'ES']

export default function VehicleForm({ onNextStep }: { onNextStep: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNextStep()
  }

  return (
    <div className="h-fit bg-white p-4 md:p-6 rounded-2xl max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="h-fit flex flex-col gap-2 lg:gap-4"
      >
        <div className="relative">
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="Marca"
            className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-black stroke-3" />
          </div>
        </div>

        <div className="relative">
          <Select>
            <SelectTrigger className="w-full h-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full">
              <SelectValue placeholder="Modelo" />
            </SelectTrigger>
            <SelectContent className=" bg-white shadow" side="bottom">
              {MOCK_MODELS.map((model) => (
                <SelectItem
                  key={model}
                  value={model}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-6 h-6 text-black stroke-3" />
          </div>
        </div>

        <div className="relative">
          <input
            type="number"
            name="year"
            id="year"
            min={1970}
            max={new Date().getFullYear()}
            placeholder="Año"
            className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
          />
        </div>

        <div className="relative">
          <Select>
            <SelectTrigger className="w-full h-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full">
              <SelectValue placeholder="Versión" />
            </SelectTrigger>
            <SelectContent className=" bg-white shadow" side="bottom">
              {MOCK_VERSIONS.map((version) => (
                <SelectItem
                  key={version}
                  value={version}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-6 h-6 text-black stroke-3" />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary uppercase font-platform-medium tracking-wide text-lg cursor-pointer text-white px-8 py-2 rounded-2xl hover:bg-primary-dark transition-colors"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  )
}
