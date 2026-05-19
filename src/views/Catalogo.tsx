import { useState, useMemo, useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { MENU } from '../data/menu'
import ProductoCard from '../components/ProductoCard'
import CategoriaFiltro from '../components/CategoriaFiltro'
import BotonWhatsApp from '../components/BotonWhatsApp'
import ToggleModo from '../components/ToggleModo'

interface Props {
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function Catalogo({ darkMode, onToggleDarkMode }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [adminMode, setAdminMode] = useState(false)
  const logoClickCount = useRef(0)
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleLogoClick() {
    logoClickCount.current += 1
    if (logoTimer.current) clearTimeout(logoTimer.current)
    if (logoClickCount.current >= 5) {
      setAdminMode(prev => !prev)
      logoClickCount.current = 0
      return
    }
    logoTimer.current = setTimeout(() => { logoClickCount.current = 0 }, 2000)
  }

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id)
    setQuery('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredMenu = useMemo(() => {
    const q = query.toLowerCase().trim()
    return MENU.map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        (q === '' || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)) &&
        (activeCategory === 'all' || cat.id === activeCategory || q !== '')
      ),
    })).filter(cat =>
      (activeCategory === 'all' || cat.id === activeCategory || q !== '') &&
      cat.items.length > 0
    )
  }, [activeCategory, query])

  const totalResults = filteredMenu.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <div className="min-h-[100dvh] bg-stone-50 dark:bg-[#0d0d0d] pb-[calc(4rem+env(safe-area-inset-bottom))]">

      {/* STICKY TOP BLOCK */}
      <div className="sticky top-0 z-30">

        {/* HEADER */}
        <header className="bg-white dark:bg-black border-b-2 border-[#F5C014] px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-stone-300 dark:border-white/80 bg-[#F5C014] overflow-hidden shrink-0 cursor-pointer select-none"
                onClick={handleLogoClick}
                title={adminMode ? 'Modo admin activo' : ''}
              >
                <img
                  src="/Max.png"
                  alt="BurguerMax"
                  className="w-full h-full object-cover"
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <div>
                <div className="text-[#F5C014] font-black text-base sm:text-xl leading-none tracking-widest uppercase">
                  BurguerMax
                </div>
                <div className="text-stone-400 dark:text-[#888] text-[0.58rem] tracking-widest uppercase mt-0.5">
                  Menu Digital
                </div>
              </div>
            </div>
            {adminMode && (
              <span className="text-[0.6rem] font-bold bg-[#F5C014] text-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                Admin
              </span>
            )}
            <ToggleModo dark={darkMode} onToggle={onToggleDarkMode} />
          </div>
        </header>

        {/* SEARCH */}
        <div className="bg-stone-100 dark:bg-black/80 border-b border-stone-200 dark:border-[#2a2a2a] px-4 py-2">
          <div className="max-w-7xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-[#888]" />
            <input
              type="search"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                if (e.target.value) setActiveCategory('all')
              }}
              placeholder="Buscar plato..."
              className="
                w-full pl-9 pr-4 py-2 rounded-lg text-sm
                bg-white dark:bg-[#1a1a1a]
                border border-stone-200 dark:border-[#2a2a2a]
                text-stone-900 dark:text-white
                placeholder:text-stone-400 dark:placeholder:text-[#888]
                focus:outline-none focus:border-[#F5C014]
                transition-colors duration-150
              "
            />
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <CategoriaFiltro
          categories={MENU}
          active={activeCategory}
          onSelect={handleCategorySelect}
        />
      </div>

      {/* MENU CONTENT */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pb-6">
        {totalResults === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <MagnifyingGlassIcon className="w-14 h-14 text-stone-400 dark:text-[#888]" />
            <p className="text-stone-400 dark:text-[#888] text-sm">
              Sin resultados para "{query}"
            </p>
          </div>
        ) : (
          filteredMenu.map(cat => (
            <section key={cat.id} className="pt-7 pb-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={cat.icon} alt={cat.title} className="w-5 h-5 shrink-0 object-contain" />
                <h2 className="text-[#F5C014] font-black text-sm sm:text-base uppercase tracking-[0.15em]">
                  {cat.title}
                </h2>
                <div className="flex-1 h-px bg-stone-200 dark:bg-[#2a2a2a]" />
              </div>

              <div className={`grid gap-2 sm:gap-3 ${
                cat.id === 'bebidas'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
              }`}>
                {cat.items.map((item, i) => (
                  <ProductoCard key={i} item={item} category={cat} adminMode={adminMode} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 py-5 text-center border-t-2 border-[#F5C014] mt-4">
        <div className="text-[#F5C014] font-black tracking-widest text-sm uppercase">BURGUERMAX</div>
        <div className="text-stone-400 dark:text-[#888] text-[0.65rem] mt-1 tracking-wide">
          Menu Digital — Precios en pesos colombianos
        </div>
      </footer>

      <BotonWhatsApp />
    </div>
  )
}
