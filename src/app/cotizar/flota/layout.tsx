import BannerSection from '@/components/cotizar/banner-section'
import imageFlota from '/public/images/fleet-delivery-vans.webp'
import iconFlota from '/public/icons/Icono_flota.webp'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BannerSection
        text="Asegurá tu flota de vehículos"
        image={imageFlota}
        icon={iconFlota}
      />
      {children}
    </>
  )
}
