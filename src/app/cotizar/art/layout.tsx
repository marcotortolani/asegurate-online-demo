import BannerSection from '@/components/cotizar/banner-section'
import imageWorker from '/public/images/male-wood-worker.webp'
import iconArt from '/public/icons/Icono_art.webp'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BannerSection
        text="Protegé a tu equipo con el seguro de ART"
        image={imageWorker}
        icon={iconArt}
      />
      {children}
    </>
  )
}
