import React from 'react'

export default function TitleSection({ title }: { title: string }) {
  return (
    <h2 className="w-5/6 md:w-3/4 max-w-2xl mx-auto mb-6 pb-3 text-3xl text-center font-platform-medium text-primary border-b-2 border-secondary">
      {title}
    </h2>
  )
}
