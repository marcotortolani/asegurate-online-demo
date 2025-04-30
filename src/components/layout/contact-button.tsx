import Link from 'next/link'
import { MessageSquare } from 'lucide-react'

export default function ContactButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/"
        className="bg-secondary text-white px-4 py-3 rounded-md flex items-center hover:bg-secondary-dark transition-colors"
      >
        Contacto
        <MessageSquare className="ml-2 h-5 w-5" />
      </Link>
    </div>
  )
}
