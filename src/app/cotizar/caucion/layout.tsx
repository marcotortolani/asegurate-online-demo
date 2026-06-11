import BannerSection from '@/components/cotizar/banner-section'
import imageCaucion from '/public/images/handshake-business-partners.webp'
import iconCaucion from '/public/icons/Icono_caucion.webp'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BannerSection
        text="Seguro de caución para tu empresa"
        image={imageCaucion}
        icon={iconCaucion}
      />
      {children}
    </>
  )
}
