import { Car, User, CreditCard } from 'lucide-react'

export default function VehicleForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
      <h2 className="text-xl font-medium text-black mb-2">
        Cotiza sin la patente de tu auto
      </h2>
      <div className="h-1 w-16 bg-secondary mb-6"></div>

      {/* Step indicators */}
      <div className="flex mb-8 gap-2">
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <Car className="h-6 w-6 text-secondary fill-secondary" />
        </button>
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <User className="h-6 w-6 text-gray-400" />
        </button>
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <CreditCard className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div className="relative">
          <select
            className="w-full p-3 bg-white border border-gray-300 rounded-md appearance-none pr-10"
            defaultValue=""
          >
            <option value="" disabled>
              Marca
            </option>
            {/* Opciones dinámicas aquí */}
            <option value="ford">Ford</option>
            <option value="chevrolet">Chevrolet</option>
            <option value="toyota">Toyota</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            className="w-full p-3 bg-white border border-gray-300 rounded-md appearance-none pr-10"
            defaultValue=""
          >
            <option value="" disabled>
              Modelo
            </option>
            {/* Opciones dinámicas aquí */}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            className="w-full p-3 bg-white border border-gray-300 rounded-md appearance-none pr-10"
            defaultValue=""
          >
            <option value="" disabled>
              Año
            </option>
            {/* Opciones dinámicas aquí */}
            {Array.from(
              { length: 30 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            className="w-full p-3 bg-white border border-gray-300 rounded-md appearance-none pr-10"
            defaultValue=""
          >
            <option value="" disabled>
              Versión
            </option>
            {/* Opciones dinámicas aquí */}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Radio options */}
        <div className="flex justify-between items-center">
          <div>
            <p className="mb-2">¿Tiene GNC?</p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gnc"
                  value="si"
                  className="h-4 w-4 text-secondary focus:ring-secondary"
                />
                <span className="ml-2">Sí</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gnc"
                  value="no"
                  className="h-4 w-4 text-secondary focus:ring-secondary"
                  defaultChecked
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          <div>
            <p className="mb-2">¿Es 0km?</p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="zerokm"
                  value="si"
                  className="h-4 w-4 text-secondary focus:ring-secondary"
                />
                <span className="ml-2">Sí</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="zerokm"
                  value="no"
                  className="h-4 w-4 text-secondary focus:ring-secondary"
                  defaultChecked
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
