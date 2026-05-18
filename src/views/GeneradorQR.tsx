import { useState, useRef } from 'react'
import QRCode from 'react-qr-code'
import { toPng } from 'html-to-image'
import {
  ArrowDownTrayIcon,
  ShareIcon,
  ClipboardIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { MENU_URL } from '../config'
import ToggleModo from '../components/ToggleModo'

interface Props {
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function GeneradorQR({ darkMode, onToggleDarkMode }: Props) {
  const [copied, setCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!qrRef.current) return
    try {
      const dataUrl = await toPng(qrRef.current, { pixelRatio: 3 })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'BurguerMax-QR.png'
      a.click()
    } catch {
      /* ignore */
    }
  }

  const handleShare = () => {
    const mensaje = encodeURIComponent(`Mira el menu digital de BurguerMax: ${MENU_URL}`)
    window.open(`https://wa.me/?text=${mensaje}`, '_blank', 'noopener')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MENU_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-[100dvh] bg-stone-50 dark:bg-[#0d0d0d] pb-[calc(4rem+env(safe-area-inset-bottom))]">

      {/* HEADER */}
      <header className="bg-white dark:bg-black border-b-2 border-[#F5C014] px-4 py-2.5">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-stone-300 dark:border-white/80 bg-[#F5C014] overflow-hidden shrink-0">
              <img src="/Max.png" alt="BurguerMax" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[#F5C014] font-black text-base leading-none tracking-widest uppercase">BurguerMax</div>
              <div className="text-stone-400 dark:text-[#888] text-[0.58rem] tracking-widest uppercase mt-0.5">Generador QR</div>
            </div>
          </div>
          <ToggleModo dark={darkMode} onToggle={onToggleDarkMode} />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6">

        {/* EYEBROW */}
        <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#F5C014]/10 text-[#F5C014] border border-[#F5C014]/20">
          Codigo QR del menu
        </span>

        {/* QR CARD — siempre blanco para descarga correcta */}
        <div
          ref={qrRef}
          className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 w-full max-w-[300px]
                     shadow-[0_0_0_1px_rgba(245,192,20,0.2),0_8px_32px_rgba(0,0,0,0.15)]
                     dark:shadow-[0_0_0_1px_rgba(245,192,20,0.15),0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <img src="/Max.png" alt="BurguerMax" className="w-14 h-14 rounded-full border-2 border-black object-cover" />
          <div className="text-black font-black text-xl tracking-[4px] uppercase">BURGUERMAX</div>
          <div className="text-stone-500 text-[0.6rem] tracking-[2px] uppercase -mt-3">Menu Digital</div>

          <div className="relative">
            <QRCode value={MENU_URL} size={200} bgColor="#ffffff" fgColor="#000000" level="H" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-md bg-white">
                <img src="/Max.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="w-full border-t border-dashed border-stone-300 pt-3 text-center">
            <p className="text-[0.6rem] font-bold text-black tracking-widest uppercase mb-1">Escanea para ver el menu</p>
            <p className="text-[0.55rem] text-stone-500 font-mono break-all">{MENU_URL}</p>
          </div>
        </div>

        {/* LINK COPIABLE */}
        <div className="w-full flex items-center gap-2">
          <div className="
            flex-1 flex items-center px-3 py-2.5 rounded-lg text-xs font-mono overflow-hidden
            bg-white dark:bg-[#1a1a1a]
            border border-stone-200 dark:border-[#2a2a2a]
            text-stone-500 dark:text-[#888]
          ">
            <span className="truncate">{MENU_URL}</span>
          </div>
          <button
            onClick={handleCopy}
            aria-label="Copiar link"
            className={`
              flex items-center justify-center w-10 h-10 rounded-lg shrink-0
              border transition-all duration-200 active:scale-95
              ${copied
                ? 'bg-green-500 border-green-500 text-white'
                : 'bg-white dark:bg-[#1a1a1a] border-stone-200 dark:border-[#2a2a2a] text-stone-400 dark:text-[#888] hover:border-[#F5C014] hover:text-[#F5C014]'
              }
            `}
          >
            {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="w-full grid grid-cols-2 gap-3">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-[#F5C014] text-black font-bold text-sm px-4 py-3.5 rounded-xl hover:bg-[#c99a00] active:scale-95 transition-all duration-200"
          >
            <ArrowDownTrayIcon className="w-4 h-4 shrink-0" />
            Descargar QR
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 font-bold text-sm px-4 py-3.5 rounded-xl active:scale-95 transition-all duration-200
                       bg-white dark:bg-[#1a1a1a]
                       text-stone-800 dark:text-white
                       border border-stone-200 dark:border-[#2a2a2a]
                       hover:border-[#F5C014] hover:text-[#F5C014]"
          >
            <ShareIcon className="w-4 h-4 shrink-0" />
            Compartir
          </button>
        </div>

        {/* TIPS */}
        <div className="w-full rounded-xl p-4 text-xs leading-relaxed
                        bg-white dark:bg-[#1a1a1a]
                        border border-stone-200 dark:border-[#2a2a2a]
                        text-stone-500 dark:text-[#888]">
          <p className="font-bold text-[#F5C014] mb-1.5 text-[0.7rem] uppercase tracking-wide">Consejos</p>
          <ul className="space-y-1">
            <li>Descarga el QR y envialo a imprimir en tamano de tarjeta.</li>
            <li>El QR siempre apunta a la misma URL — el menu se actualiza sin cambiar el QR.</li>
            <li>Coloca el QR impreso en cada mesa del local.</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
