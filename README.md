# BurguerMax — Menu Digital

Menu digital interactivo para BurguerMax, accesible mediante codigo QR desde cualquier celular con internet.

## URL de Produccion

- **Menu:** https://burguermax-menu.netlify.app/menu.html
- **Generador QR:** https://burguermax-menu.netlify.app/qr-imprimir.html

## Tecnologias

- HTML5 + CSS3 + JavaScript Vanilla
- Hosting: Netlify (gratuito)
- QR: qrcode.min.js (libreria local)

## Archivos

| Archivo | Descripcion |
|---|---|
| `menu.html` | Menu digital completo — archivo principal |
| `qr-imprimir.html` | Generador de QR para imprimir en las mesas |
| `qrcode.min.js` | Libreria QR (local, sin dependencias externas) |
| `index.html` | Redireccion automatica a menu.html |
| `Max.png` | Logo oficial de BurguerMax |

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

## Como usar el Generador QR

1. Abrir https://burguermax-menu.netlify.app/qr-imprimir.html
2. Pegar la URL del menu: `https://burguermax-menu.netlify.app/menu.html`
3. Clic en **Generar QR para Imprimir**
4. Clic en **Imprimir QR** o **Descargar PNG**
5. Colocar el QR impreso en cada mesa y en la entrada del local

## Como actualizar el menu

1. Editar `menu.html` en VS Code (buscar el plato con Ctrl+F)
2. Guardar con Ctrl+S
3. Arrastrar la carpeta `MenuBurguerMaxQR` a **app.netlify.com/drop**
4. Netlify actualiza automaticamente — el QR no cambia

## Flujo del cliente

1. Cliente llega a la mesa y ve el codigo QR
2. Escanea con la camara de su celular
3. Se abre el menu de BurguerMax en el navegador
4. Navega por categorias, ve precios y descripcion de cada plato
5. Funciona con WiFi o datos moviles — sin necesidad de app

## Version

- v1.0 — Menu digital con hosting online via Netlify
