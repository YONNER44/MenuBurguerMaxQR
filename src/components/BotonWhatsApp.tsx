import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { WHATSAPP_NUMBER } from '../config'

export default function BotonWhatsApp() {
  const mensaje = encodeURIComponent(
    'Hola BurguerMax! Quiero hacer un pedido a domicilio.\n\nDireccion: \n\nPedido:'
  )
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed z-40
        right-4 bottom-[calc(3.5rem+env(safe-area-inset-bottom)+0.75rem)]
        flex items-center gap-2
        bg-[#F5C014] text-black font-bold text-sm
        px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(245,192,20,0.35)]
        hover:bg-[#c99a00] active:scale-95
        transition-all duration-200
      "
    >
      <ChatBubbleLeftIcon className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline whitespace-nowrap">Pedir a domicilio</span>
    </a>
  )
}
