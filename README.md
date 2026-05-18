# BurguerMax — Menu Digital v3.0

Stack: React 18 + Vite + TypeScript + Tailwind CSS + Heroicons

URL produccion: https://burguermax-menu.netlify.app

## Desarrollo local

```bash
npm install
npm run dev
```

## Build produccion

```bash
npm run build
# output: dist/
```

## Configuracion

Edita `src/config.ts`:
- `WHATSAPP_NUMBER` — numero con codigo de pais (ej: `573001234567`)
- `MENU_URL` — URL del menu en Netlify

## Deploy en Netlify

| Parametro | Valor |
|-----------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 18+ |
| Branch | `main` |

## Estructura

```
src/
  App.tsx              — vista activa + dark mode
  config.ts            — WhatsApp number, URL
  data/menu.ts         — todos los productos y categorias
  views/
    Catalogo.tsx       — menu principal
    GeneradorQR.tsx    — generador y descarga de QR
  components/
    ProductoCard.tsx
    CategoriaFiltro.tsx
    BotonWhatsApp.tsx
    BottomNav.tsx
    ToggleModo.tsx
public/
  Max.png              — logo
```

## Categorias del Menu

- Hamburguesas (16 items)
- Perros Calientes (6 items)
- Salchi Max (7 items)
- Carnes Especiales (13 items)
- Tasty's (8 items)
- Papitas y Mas (6 items)
- Pizzas (4 items)
- Creps (3 items)
- Adicionales (14 items)
- Bebidas (19 items)
