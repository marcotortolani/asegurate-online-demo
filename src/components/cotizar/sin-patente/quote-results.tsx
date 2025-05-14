interface QuoteResultsProps {
  quotes?: {
    title: string
    price: string
    description: string
    detail?: string
  }[]
}

export default function QuoteResults({
  quotes = [
    {
      title: 'Responsabilidad Civil',
      price: '$29.635',
      description:
        'Responsabilidad Civil hacia terceros Transportados con límite de cobertura: $39.000.000 para Automóviles, $85.000.000 para camiones, acoplados, Maquinas rurales y viales.',
      detail: 'Cobertura en paises limítrofes',
    },
    {
      title: 'Daños Totales',
      price: '$59.406',
      description:
        'Responsabilidad Civil hacia terceros Transportados con límite de cobertura: $39.000.000 para Automóviles, $85.000.000 para camiones, acoplados, Maquinas rurales y viales.',
      detail: 'Cobertura en paises limítrofes',
    },
  ],
}: QuoteResultsProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
      {/* Quote cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 bg-white border border-secondary rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-lg font-platform-medium text-neutral-900 font-medium ">
              {quote.title}
            </h3>
            <p className="text-2xl font-bold text-primary">{quote.price}</p>
            <div className=" w-5/6 h-0.75 bg-secondary" />
            <p className="text-base text-center font-platform-regular text-gray-600">
              {quote.description}
            </p>
            <div className=" w-5/6 h-0.75 bg-secondary" />
            <p className="text-sm text-center font-platform-medium text-neutral-900">
              {quote.detail}
            </p>
            <button
              type="button"
              className="bg-primary uppercase font-platform-medium tracking-wide text-lg cursor-pointer text-white px-8 py-2 rounded-2xl hover:bg-primary-dark transition-colors"
            >
              CONTRATAR
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
