import BannerSection from '@/components/cotizar/banner-section'
import imageMoto from '/public/images/motorcycle-parking-front.webp'
import iconMoto from '/public/icons/Icono_motos.webp'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BannerSection
        text="Cotizar el seguro de tu moto ahora es más fácil"
        image={imageMoto}
        icon={iconMoto}
      />
      {children}
    </>
  )
}
