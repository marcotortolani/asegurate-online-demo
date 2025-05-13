import type { Metadata } from 'next'

import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ContactButton from '@/components/layout/contact-button'

export const metadata: Metadata = {
  title: 'Asegurate Online',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`relative top-0 w-screen min-h-screen scroll-smooth overflow-x-hidden bg-white `}>
        <Header />
        {children}
        <ContactButton />
        <Footer />
      </body>
    </html>
  )
}
