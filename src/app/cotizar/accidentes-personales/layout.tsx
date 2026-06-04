import BannerSection from '@/components/cotizar/banner-section'
import imageAccident from '/public/images/accident-ambulance.webp'
import iconAccidentes from '/public/icons/Icono_accidentes.webp'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BannerSection
        text="Cubrite ante imprevistos con el seguro de Accidentes Personales"
        image={imageAccident}
        icon={iconAccidentes}
      />
      {children}
    </>
  )
}
