import BannerSection from '@/components/cotizar/banner-section'

import imageCar from '/public/images/car-traveling-driving.webp'
import iconCar from '/public/icons/Icono_autos.webp'

export default function Page() {
  return (
    <>
      <BannerSection
        text="Cotizar el seguro de tu auto ahora es más fácil"
        image={imageCar}
        icon={iconCar}
      />
      <div className="container mx-auto h-full p-6 mt-10 ">
        <h2 className="w-3/4 max-w-2xl mx-auto mb-6 pb-3 text-3xl text-center font-platform-medium text-primary border-b-2 border-secondary">
          ¿Cúal es la patente de tu auto?
        </h2>

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

            <button
              type="button"
              className="w-56 bg-primary-grayish uppercase text-lg font-platform-regular tracking-wider text-white px-6 py-3 rounded-2xl hover:bg-primary transition-colors"
            >
              Cotizar sin patente
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
