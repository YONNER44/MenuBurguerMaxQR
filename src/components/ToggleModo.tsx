import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

interface Props {
  dark: boolean
  onToggle: () => void
}

export default function ToggleModo({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="flex items-center justify-center w-9 h-9 rounded-full
                 bg-stone-100 dark:bg-[#1a1a1a]
                 border border-stone-200 dark:border-[#2a2a2a]
                 text-stone-500 dark:text-[#888]
                 hover:border-[#F5C014] hover:text-[#F5C014]
                 transition-all duration-200 active:scale-95"
    >
      {dark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  )
}
