import type { MenuItem, MenuCategory } from '../data/menu'

interface Props {
  item: MenuItem
  category: MenuCategory
}

export default function ProductoCard({ item, category }: Props) {
  return (
    <article className="
      group flex flex-col rounded-xl overflow-hidden h-full
      bg-white dark:bg-[#1a1a1a]
      border border-stone-200 dark:border-[#2a2a2a]
      hover:border-[#F5C014]
      transition-all duration-200 hover:-translate-y-0.5
    ">
      <div
        className="h-20 sm:h-24 flex items-center justify-center shrink-0"
        style={{ background: category.gradient }}
      >
        <img
          src={category.icon}
          alt={category.title}
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg
                     group-hover:scale-110 transition-transform duration-200"
        />
      </div>

      <div className="flex flex-col flex-1 p-2.5 sm:p-3">
        <p className="text-[0.75rem] sm:text-[0.82rem] font-bold leading-snug text-stone-900 dark:text-white mb-1">
          {item.name}
        </p>
        {item.desc && (
          <p className="text-[0.65rem] sm:text-[0.7rem] leading-relaxed text-stone-500 dark:text-[#888] flex-1 mb-2 line-clamp-3">
            {item.desc}
          </p>
        )}
        <div className="flex items-center justify-between gap-1.5 mt-auto flex-wrap">
          <span className="text-sm sm:text-base font-black text-[#F5C014] whitespace-nowrap">
            <span className="text-[0.65rem] opacity-70">$</span>{item.price}
          </span>
          {item.badge && (
            <span className={`text-[0.55rem] sm:text-[0.6rem] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide whitespace-nowrap
              ${item.badgeType === 'red' ? 'bg-red-600 text-white' : 'bg-[#F5C014] text-black'}`}>
              {item.badge}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
