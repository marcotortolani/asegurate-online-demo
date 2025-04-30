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
      <body
        className={` antialiased bg-white`}
      >
        <Header />
        {children}
        <Footer />
        <ContactButton />
      </body>
    </html>
  )
}
