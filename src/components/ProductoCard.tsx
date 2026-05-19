import { useState, useRef } from 'react'
import type { MenuItem, MenuCategory } from '../data/menu'

interface Props {
  item: MenuItem
  category: MenuCategory
  adminMode?: boolean
}

function toSlug(str: string): string {
  const map: Record<string, string> = {
    'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u','ñ':'n',
    'Á':'a','É':'e','Í':'i','Ó':'o','Ú':'u','Ü':'u','Ñ':'n',
  }
  return str
    .split('').map(c => map[c] ?? c).join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '')
}

const UPLOAD_URL = '/upload.php'

export default function ProductoCard({ item, category, adminMode }: Props) {
  const slug = toSlug(item.name)
  const imagePath = `/productos/${category.id}/${slug}.jpg`

  const [hasImg, setHasImg] = useState(true)
  const [imgKey, setImgKey] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setStatus('idle')

    const fd = new FormData()
    fd.append('category', category.id)
    fd.append('product', item.name)
    fd.append('image', file)

    try {
      const res  = await fetch(UPLOAD_URL, { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setHasImg(true)
        setImgKey(k => k + 1)
        setStatus('ok')
      } else {
        setStatus('err')
      }
    } catch {
      setStatus('err')
    }

    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
    setTimeout(() => setStatus('idle'), 3000)
  }

  const isHorizontal = category.id === 'bebidas'

  const uploadOverlay = adminMode && (
    <>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="absolute inset-0 flex items-center justify-center bg-black/60
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {uploading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : status === 'ok' ? (
          <span className="text-[0.65rem] font-bold bg-green-500 text-white px-2 py-1 rounded-full">✓ Guardado</span>
        ) : status === 'err' ? (
          <span className="text-[0.65rem] font-bold bg-red-600 text-white px-2 py-1 rounded-full">✗ Error</span>
        ) : (
          <span className="text-[0.65rem] font-bold bg-[#F5C014] text-black px-2 py-1 rounded-full">📷 Subir foto</span>
        )}
      </button>
    </>
  )

  const imageBlock = (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center
        ${isHorizontal ? 'w-36 sm:w-44 h-full' : 'h-36 sm:h-44 w-full'}`}
      style={{ background: category.gradient }}
    >
      {hasImg ? (
        <img
          key={imgKey}
          src={imagePath}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          onError={() => setHasImg(false)}
        />
      ) : (
        <img
          src={category.icon}
          alt={category.title}
          className={`object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-200
            ${isHorizontal ? 'w-10 h-10' : 'w-14 h-14 sm:w-16 sm:h-16'}`}
        />
      )}
      {uploadOverlay}
    </div>
  )

  const infoBlock = (
    <div className={`flex flex-col flex-1 p-2.5 sm:p-3 ${isHorizontal ? 'justify-center' : ''}`}>
      <p className={`font-bold leading-snug text-stone-900 dark:text-white mb-1
        ${isHorizontal ? 'text-[0.8rem] sm:text-[0.9rem]' : 'text-[0.75rem] sm:text-[0.82rem]'}`}>
        {item.name}
      </p>
      {item.desc && (
        <p className="text-[0.65rem] sm:text-[0.7rem] leading-relaxed text-stone-500 dark:text-[#888] flex-1 mb-2 line-clamp-2">
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
  )

  return (
    <article className={`
      group overflow-hidden
      bg-white dark:bg-[#1a1a1a]
      border border-stone-200 dark:border-[#2a2a2a]
      hover:border-[#F5C014]
      transition-all duration-200 hover:-translate-y-0.5
      ${isHorizontal
        ? 'flex flex-row rounded-xl h-36 sm:h-44'
        : 'flex flex-col rounded-xl h-full'}
    `}>
      {imageBlock}
      {infoBlock}
    </article>
  )
}
