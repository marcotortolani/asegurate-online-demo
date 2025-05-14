import BannerSection from '@/components/cotizar/banner-section'
import imageCar from '/public/images/car-traveling-driving.webp'
import iconCar from '/public/icons/Icono_autos.webp'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BannerSection
        text="Cotizar el seguro de tu auto ahora es más fácil"
        image={imageCar}
        icon={iconCar}
      />
      {children}
    </>
  )
}
