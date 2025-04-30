import { Car, User, CreditCard, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface QuoteResultsProps {
  quotes?: {
    title: string
    price: string
    description: string
  }[]
}

export default function QuoteResults({
  quotes = [
    {
      title: 'Responsabilidad Civil',
      price: '$29.635',
      description:
        'Responsabilidad Civil hacia terceros transportados y no transportados. $6.000.000 por evento/siniestro. Moto/bicicleta y vehículos.',
    },
    {
      title: 'Daños Totales',
      price: '$59.406',
      description:
        'Responsabilidad Civil hacia terceros transportados y no transportados. $6.000.000 por evento/siniestro. Moto/bicicleta y vehículos.',
    },
  ],
}: QuoteResultsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
      <h2 className="text-xl font-medium text-black mb-2">
        Cotiza sin la patente de tu auto
      </h2>
      <div className="h-1 w-16 bg-secondary mb-6"></div>

      {/* Step indicators */}
      <div className="flex mb-8 gap-2">
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <Car className="h-6 w-6 text-gray-400" />
        </button>
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <User className="h-6 w-6 text-gray-400" />
        </button>
        <button className="flex-1 p-4 border border-gray-300 rounded-md bg-white flex justify-center items-center">
          <CreditCard className="h-6 w-6 text-secondary fill-secondary" />
        </button>
      </div>

      {/* Quote cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-lg font-medium mb-2">{quote.title}</h3>
            <p className="text-2xl font-bold text-primary mb-4">
              {quote.price}
            </p>
            <p className="text-sm text-gray-600 mb-6">{quote.description}</p>
            <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
              CONTRATAR
            </button>
          </div>
        ))}
      </div>

      {/* Contact button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/contacto"
          className="bg-secondary text-white px-4 py-3 rounded-md flex items-center hover:bg-secondary-dark transition-colors"
        >
          Contacto
          <MessageSquare className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}
