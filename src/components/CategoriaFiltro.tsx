import { Squares2X2Icon } from '@heroicons/react/24/outline'
import type { MenuCategory } from '../data/menu'

interface Props {
  categories: MenuCategory[]
  active: string
  onSelect: (id: string) => void
}

export default function CategoriaFiltro({ categories, active, onSelect }: Props) {
  return (
    <div className="overflow-x-auto scrollbar-none bg-stone-100 dark:bg-black/90 border-b border-stone-200 dark:border-[#2a2a2a]">
      <div className="flex gap-1.5 px-4 py-2 min-w-max max-w-7xl mx-auto">

        <button
          onClick={() => onSelect('all')}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] font-semibold whitespace-nowrap
            border transition-all duration-150 active:scale-95
            ${active === 'all'
              ? 'bg-[#F5C014] text-black border-[#F5C014]'
              : 'bg-white dark:bg-[#1a1a1a] border-stone-200 dark:border-[#2a2a2a] text-stone-500 dark:text-[#888] hover:border-[#F5C014] hover:text-[#F5C014]'
            }
          `}
        >
          <Squares2X2Icon className="w-3.5 h-3.5 shrink-0" />
          Todo
        </button>

        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] font-semibold whitespace-nowrap
              border transition-all duration-150 active:scale-95
              ${active === cat.id
                ? 'bg-[#F5C014] text-black border-[#F5C014]'
                : 'bg-white dark:bg-[#1a1a1a] border-stone-200 dark:border-[#2a2a2a] text-stone-500 dark:text-[#888] hover:border-[#F5C014] hover:text-[#F5C014]'
              }
            `}
          >
            <img src={cat.icon} alt={cat.title} className="w-4 h-4 shrink-0 object-contain" />
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  )
}
