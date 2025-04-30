export default function VehicleForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
      <h2 className="text-xl font-medium text-black mb-2">
        ¿Cúal es la patente de tu auto?
      </h2>
      <div className="h-1 w-16 bg-secondary mb-6"></div>

      {/* Form fields */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 bg-white border border-gray-300 rounded-md"
            placeholder="Ej: AB123CD"
          />
        </div>

        <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
          Confirmar
        </button>

        <button className="bg-accent text-white px-6 py-3 rounded-md hover:bg-accent-dark transition-colors">
          Cotizar sin patente
        </button>
      </div>
    </div>
  )
}
