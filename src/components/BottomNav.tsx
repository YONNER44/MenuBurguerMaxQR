import { Squares2X2Icon, QrCodeIcon } from '@heroicons/react/24/outline'
import { Squares2X2Icon as Squares2X2Solid, QrCodeIcon as QrCodeSolid } from '@heroicons/react/24/solid'

type View = 'catalogo' | 'qr'

interface Props {
  active: View
  onNavigate: (v: View) => void
}

export default function BottomNav({ active, onNavigate }: Props) {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 flex items-stretch
                 bg-white dark:bg-black
                 border-t border-stone-200 dark:border-[#2a2a2a]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <button
        onClick={() => onNavigate('catalogo')}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5
          text-[0.65rem] font-semibold transition-colors duration-150
          ${active === 'catalogo' ? 'text-[#F5C014]' : 'text-stone-400 dark:text-[#888] hover:text-stone-600 dark:hover:text-stone-300'}`}
      >
        {active === 'catalogo' ? <Squares2X2Solid className="w-5 h-5" /> : <Squares2X2Icon className="w-5 h-5" />}
        Menu
      </button>

      <button
        onClick={() => onNavigate('qr')}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5
          text-[0.65rem] font-semibold transition-colors duration-150
          ${active === 'qr' ? 'text-[#F5C014]' : 'text-stone-400 dark:text-[#888] hover:text-stone-600 dark:hover:text-stone-300'}`}
      >
        {active === 'qr' ? <QrCodeSolid className="w-5 h-5" /> : <QrCodeIcon className="w-5 h-5" />}
        Codigo QR
      </button>
    </nav>
  )
}
