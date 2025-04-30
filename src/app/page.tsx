import BannerBancoDelSol from '@/components/home/banner-banco-del-sol'
import BannerPrevencionSalud from '@/components/home/banner-prevencion-salud'
import HeroSection from '@/components/home/hero-section'
import InsuranceOptions from '@/components/home/insurance-options'
export default function Home() {
  return (
    <div className="bg-white ">
      <HeroSection />
      <div className="h-0.5 w-2/3 mx-auto max-w-[600px] bg-neutral-400/80 my-6"></div>
      <BannerPrevencionSalud />
      <InsuranceOptions />
      <BannerBancoDelSol />
    </div>
  )
}
