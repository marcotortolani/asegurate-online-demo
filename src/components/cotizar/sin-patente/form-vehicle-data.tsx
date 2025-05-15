import { SearchIcon, ChevronDown } from 'lucide-react'

export default function VehicleForm({
  onNextStep,
}: {
  onNextStep: () => void
}) {
  return (
    <div className="h-fit bg-white p-4 md:p-6 rounded-2xl max-w-3xl mx-auto">
      {/* Form fields */}
      <div className="h-fit flex flex-col gap-2">
        <div className="relative">
          <input
            type="text"
            name="brand"
            id="brand"
            placeholder="Marca"
            className="w-full px-6 py-2 font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
          />
          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-black stroke-3" />
          </div>
        </div>

        <div className="relative">
          <select
            className="w-full px-6 py-2 appearance-none font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            defaultValue=""
            name="model"
            id="model"
          >
            <option value="" disabled>
              Modelo
            </option>
            {/* Opciones dinámicas aquí */}
          </select>
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
          <select
            className="w-full px-6 py-2 appearance-none font-platform-regular text-xl placeholder:text-primary/60 text-primary bg-white border-4 border-gray-300 rounded-full"
            defaultValue=""
          >
            <option value="" disabled>
              Versión
            </option>
            {/* Opciones dinámicas aquí */}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
            <ChevronDown className="w-6 h-6 text-black stroke-3" />
          </div>
        </div>

        {/* Radio options */}
        <div className="flex justify-between items-center">
          {/* GNC */}
          <div className=" text-primary-grayish font-platform-regular text-lg">
            <p className="mb-2">¿Tiene GNC?</p>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-1">
                <span>Sí</span>
                <input
                  type="radio"
                  name="gnc"
                  value="si"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>No</span>
                <input
                  type="radio"
                  name="gnc"
                  value="no"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer"
                  defaultChecked
                />
              </label>
            </div>
          </div>
          {/* 0KM */}
          <div className=" text-primary-grayish font-platform-regular text-lg">
            <p className="mb-2">¿Es 0km?</p>
            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-1">
                <span>Sí</span>
                <input
                  type="radio"
                  name="zerokm"
                  value="si"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer "
                />
              </label>
              <label className="flex items-center gap-1">
                <span>No</span>
                <input
                  type="radio"
                  name="zerokm"
                  value="no"
                  className="h-4 w-4 checked:accent-amber-600 cursor-pointer "
                  defaultChecked
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={onNextStep}
            className="bg-primary uppercase font-platform-medium tracking-wide text-lg cursor-pointer text-white px-8 py-2 rounded-2xl hover:bg-primary-dark transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
