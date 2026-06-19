import BannerSection from '@/components/cotizar/banner-section'
import imageComercio from '/public/images/man-waiting-scanned.webp'
import iconComercio from '/public/icons/Icono_comercio.webp'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BannerSection
        text="Asegurá tu comercio y seguí creciendo"
        image={imageComercio}
        icon={iconComercio}
      />
      {children}
    </>
  )
}
