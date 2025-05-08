import Image from 'next/image'
import bancoDelSol from '/public/images/bancodelsol-logo.webp'
import bancoDigital from '/public/images/bancodigital.webp'

export default function BannerBancoDelSol() {
  return (
    <div className="container mx-auto  max-w-4xl px-4 py-4 ">
      <div className="w-full h-32 my-10  mx-auto bg-[rgb(124,54,192)] text-white px-10 py-5 rounded-[3.5rem] flex items-center justify-evenly">
        <div className=" h-full pb-2">
          <Image
            src={bancoDelSol}
            alt="Banco del Sol"
            width={100}
            height={80}
            className="h-full w-auto"
          />
        </div>
        <div className=" w-1 h-20 bg-white content-normal" />

        <div className=" h-full">
          <Image
            src={bancoDigital}
            alt="Banco Digital - Sancor Seguros"
            width={100}
            height={100}
            className="h-full w-auto"
          />
        </div>
      </div>
    </div>
  )
}
