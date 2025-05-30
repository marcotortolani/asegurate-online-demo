import Image from 'next/image'

import atencionIcono from '/public/icons/Icono_atencion.webp'

export default function ContactButton() {
  return (
    <div className="z-50 sticky bottom-18 md:bottom-24  right-0">
      <div className="absolute -bottom-14 md:-bottom-12 right-2 md:right-8 xl:right-10">
        <button
          type="button"
          className="group relative bg-secondary font-platform-regular text-2xl text-white px-3 py-2 md:px-4 md:py-3 rounded-2xl rounded-br-none flex items-center gap-3 hover:cursor-pointer hover:bg-secondary-dark transition-colors"
        >
          <span className=" hidden md:block">Contacto</span>
          <Image
            src={atencionIcono}
            alt="Atención"
            width={40}
            height={40}
            className=" z-10 h-8 w-8"
          />
          {/* <div className="absolute bottom-0 right-0 h-6 w-6 bg-black skew-x-10 "></div> */}
          <div
            className="-z-10 absolute bottom-0 right-0 translate-y-1/2 h-0 w-0 border-t-[5px] md:border-t-[15px] border-r-[20px] border-b-[15px] 
          border-solid border-t-transparent border-b-transparent border-r-secondary group-hover:border-r-secondary-dark transition-colors "
          ></div>
        </button>
      </div>
    </div>
  )
}
