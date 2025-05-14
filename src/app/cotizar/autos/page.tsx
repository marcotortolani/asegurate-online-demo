import TitleSection from '@/components/title-section'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="container mx-auto h-full p-6 mt-10 ">
      <TitleSection title="¿Cúal es la patente de tu auto?" />

      {/* Form fields */}
      <div className="space-y-4">
        <div className="w-full flex flex-col items-center justify-center gap-8 relative">
          <input
            type="text"
            className="w-60 px-6 py-2 font-platform-regular text-xl text-primary placeholder:text-primary/50 bg-white border-4 border-gray-200 rounded-full"
            placeholder="Ej: AB123CD"
          />
          <button
            type="button"
            className="w-56 bg-primary uppercase text-2xl font-platform-medium tracking-wider text-white px-6 py-3 rounded-2xl hover:bg-primary-grayish transition-colors"
          >
            Confirmar
          </button>

          <Link
            href="/cotizar/autos/sin-patente"
            className="w-56 bg-primary-grayish uppercase text-lg font-platform-regular tracking-wider text-white px-6 py-3 rounded-2xl hover:bg-primary transition-colors"
          >
            Cotizar sin patente
          </Link>
        </div>
      </div>
    </div>
  )
}
