import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const PRODUCTOS_DIR = './public/productos'
const MAX_DIM = 800
const QUALITY = 78

function getFiles(dir) {
  const entries = readdirSync(dir)
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...getFiles(full))
    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(extname(entry).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

const files = getFiles(PRODUCTOS_DIR)
let totalBefore = 0
let totalAfter = 0

console.log(`\nOptimizando ${files.length} imágenes...\n`)

for (const file of files) {
  const sizeBefore = statSync(file).size
  totalBefore += sizeBefore

  try {
    const img = sharp(file)
    const meta = await img.metadata()

    const needsResize = (meta.width ?? 0) > MAX_DIM || (meta.height ?? 0) > MAX_DIM

    await img
      .resize(needsResize ? { width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true } : undefined)
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(file + '.tmp')

    const { renameSync, unlinkSync } = await import('fs')
    unlinkSync(file)
    renameSync(file + '.tmp', file)

    const sizeAfter = statSync(file).size
    totalAfter += sizeAfter

    const saved = Math.round((1 - sizeAfter / sizeBefore) * 100)
    console.log(`✓ ${file.replace(PRODUCTOS_DIR, '')}  ${Math.round(sizeBefore/1024)}KB → ${Math.round(sizeAfter/1024)}KB  (-${saved}%)`)
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`)
  }
}

console.log(`\n─────────────────────────────────────────`)
console.log(`Total antes:  ${(totalBefore/1024/1024).toFixed(1)} MB`)
console.log(`Total después: ${(totalAfter/1024/1024).toFixed(1)} MB`)
console.log(`Ahorro:       ${((totalBefore-totalAfter)/1024/1024).toFixed(1)} MB (${Math.round((1-totalAfter/totalBefore)*100)}%)`)
