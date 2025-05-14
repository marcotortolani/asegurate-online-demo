import BannerSection from '@/components/cotizar/banner-section'
import imageMechanic from '/public/images/man-mechanic-customer.webp'
import iconCar from '/public/icons/Icono_autos.webp'

export default function LayoutSection({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="w-screen min-h-[75dvh] pt-32 md:pt-36">
      <BannerSection
        text="¿Cómo hacer la auto inspección de tu vehículo?"
        image={imageMechanic}
        icon={iconCar}
      />
      {children}
    </main>
  )
}
