import { Car, User, CreditCard } from 'lucide-react'

export default function PersonalInfoForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
      <h2 className="text-xl font-medium text-black mb-2">
        Cotiza sin la patente de tu auto
      </h2>
      <div className="h-1 w-16 bg-secondary mb-6"></div>

      {/* Step indicators */}
      <div className="flex mb-8 gap-2">
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <Car className="h-6 w-6 text-gray-400" />
        </button>
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <User className="h-6 w-6 text-secondary fill-secondary" />
        </button>
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <CreditCard className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      {/* Gender selection */}
      <div className="flex gap-2 mb-6">
        <button className="p-3 bg-secondary rounded-md">
          <User className="h-5 w-5 text-white" />
        </button>
        <button className="p-3 bg-gray-300 rounded-md">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Código Postal"
          className="w-full p-3 bg-white border border-gray-300 rounded-md"
        />

        <input
          type="text"
          placeholder="Edad"
          className="w-full p-3 bg-white border border-gray-300 rounded-md"
        />

        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-3 bg-white border border-gray-300 rounded-md"
        />

        <input
          type="text"
          placeholder="Apellido"
          className="w-full p-3 bg-white border border-gray-300 rounded-md"
        />

        <div className="flex items-center mb-2">
          <span className="mr-2">Tel. Cel.</span>
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Cod. Área"
              className="w-1/3 p-3 bg-white border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="1234567890"
              className="flex-1 p-3 bg-white border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full p-3 bg-white border border-gray-300 rounded-md"
        />

        <div className="flex justify-between mt-6">
          <button className="bg-gray-300 text-black px-6 py-3 rounded-md hover:bg-gray-400 transition-colors">
            Atrás
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
            Cotizar
          </button>
        </div>
      </div>
    </div>
  )
}
