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

## Preview build local

```bash
npm run preview
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
  App.tsx              — estado global: vista activa + dark mode (localStorage)
  config.ts            — WHATSAPP_NUMBER, MENU_URL
  data/menu.ts         — todos los productos, categorias, precios y badges
  views/
    Catalogo.tsx       — menu principal con filtro por categoria
    GeneradorQR.tsx    — generador y descarga de QR como imagen
  components/
    ProductoCard.tsx   — tarjeta de producto con imagen, nombre, precio y badge
    CategoriaFiltro.tsx — tabs de filtro horizontal
    BotonWhatsApp.tsx  — boton flotante de contacto
    BottomNav.tsx      — navegacion inferior (Catalogo / QR)
    ToggleModo.tsx     — switch dark/light mode
public/
  Max.png              — logo
  Iconos/              — iconos de categoria (11 archivos PNG)
  productos/           — imagenes de productos por categoria (96+ archivos)
scripts/
  optimize-images.mjs  — optimiza y redimensiona imagenes en public/productos/
```

## Scripts utiles

```bash
# Optimizar imagenes en public/productos/ (requiere sharp)
node scripts/optimize-images.mjs
```

El script redimensiona a max 800px y convierte a JPEG con calidad 78 (mozjpeg).

## Backend (XAMPP local)

Ubicacion: `../backend/`

| Archivo | Funcion |
|---------|---------|
| `upload.php` | Recibe imagen, la redimensiona (max 800px, GD) y la guarda en `public/productos/{categoria}/` |
| `admin-imagenes.html` | Interfaz de carga de imagenes por categoria y producto |

Proxy en dev: `/upload.php` → `http://localhost/Proyecto_menu_digital_burguermax`

## Agregar producto al menu

1. Editar `src/data/menu.ts`
2. Localizar la categoria en `MENU[]`
3. Agregar objeto `MenuItem` con `name`, `desc`, `price` y opcionalmente `badge` / `badgeType`
4. Colocar imagen en `public/productos/{id-categoria}/nombre-slug.jpg`

## Badges disponibles

| `badgeType` | Color | Uso tipico |
|-------------|-------|------------|
| `'red'`     | Rojo  | Promociones 2x1 |
| `'gold'`    | Dorado | Porciones especiales / combos grandes |

## Categorias del Menu

| Categoria | Items | ID |
|-----------|-------|----|
| Hamburguesas | 17 | `hamburguesas` |
| Perros Calientes | 6 | `perros` |
| Salchi Max | 7 | `salchimax` |
| Carnes Especiales | 13 | `carnes` |
| Tasty's | 8 | `tastys` |
| Papitas y Mas | 6 | `papitas` |
| Pizzas | 4 | `pizzas` |
| Creps | 3 | `creps` |
| Adicionales | 14 | `adicionales` |
| Bebidas | 19 | `bebidas` |

**Total: 97 items**
