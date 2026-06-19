import BannerSection from '@/components/cotizar/banner-section'
import imageHogar from '/public/images/entrance-residential-house.webp'
import iconHogar from '/public/icons/Icono_hogar.webp'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BannerSection
        text="Protegé tu hogar y lo que más querés"
        image={imageHogar}
        icon={iconHogar}
      />
      {children}
    </>
  )
}
