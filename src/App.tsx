import { useState, useEffect } from 'react'
import Catalogo from './views/Catalogo'
import GeneradorQR from './views/GeneradorQR'
import BottomNav from './components/BottomNav'

type View = 'catalogo' | 'qr'

export default function App() {
  const [view, setView] = useState<View>('catalogo')
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('bm_dark')
    return saved !== null ? saved === 'true' : true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('bm_dark', String(darkMode))
  }, [darkMode])

  const toggleDark = () => setDarkMode(prev => !prev)

  return (
    <>
      {view === 'catalogo' ? (
        <Catalogo darkMode={darkMode} onToggleDarkMode={toggleDark} />
      ) : (
        <GeneradorQR darkMode={darkMode} onToggleDarkMode={toggleDark} />
      )}
      <BottomNav active={view} onNavigate={setView} />
    </>
  )
}
