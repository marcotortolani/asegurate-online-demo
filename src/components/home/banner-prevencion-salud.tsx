import Image from 'next/image'
import React from 'react'

export default function BannerPrevencionSalud() {
  return (
    <div className="container mx-auto max-w-2xl ">
      <div className="border-2 border-neutral-400 rounded-[2.5rem] p-4 flex items-center justify-between">
        <div className="text-[#f0217e] font-bold text-xl">
          Prevención Salud
          <div className="text-sm font-normal text-gray-600">
            DE SANCOR SEGUROS
          </div>
        </div>
        <div>
          <Image
            src="/placeholder.svg?height=80&width=100"
            alt="Prevención Salud"
            width={100}
            height={80}
            className="h-16 w-auto"
          />
        </div>
      </div>
    </div>
  )
}
