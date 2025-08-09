# AgriVolt - Landing Page de Drones Agrícolas

Sitio web estático para la venta de drones agrícolas AgriVolt, desarrollado con Next.js 14 y Tailwind CSS. Integra contenido completo de productos Titan 150, Pro 100 y Edge 70 con formulario de cotización avanzado.

## 🚀 Características

- **100% Estático**: Optimizado para despliegue sin servidor (`output: 'export'`)
- **SEO Optimizado**: Meta tags específicos, JSON-LD schemas, Open Graph
- **Formulario Inteligente**: Cotización breve + extendida con validación
- **Responsive**: Design system mobile-first con breakpoints profesionales
- **Performante**: LCP < 2.5s, bundle ~106kB, caché optimizado
- **Accesible**: Contraste AA, semántica correcta, `prefers-reduced-motion`

## 🛠 Stack Tecnológico

- **Framework**: Next.js 15.4.6 (App Router) con exportación estática
- **React**: v19.1.0 con TypeScript 5
- **Estilos**: Tailwind CSS v3.4 estable + PostCSS + Autoprefixer
- **Tipografías**: Space Grotesk (títulos) + Inter (cuerpo) via `next/font/google`
- **Datos**: JSON local editable (`data/modelos.json`) con tipos TypeScript
- **SEO**: JSON-LD Product + FAQPage + Organization schemas completos
- **Build**: Completamente estático, 10 páginas pre-renderizadas

## 📁 Estructura del Proyecto

```
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout con fuentes y metadata
│   │   ├── page.tsx                # Landing principal con FAQs JSON-LD
│   │   ├── globals.css             # Variables CSS y Tailwind
│   │   ├── cotizar/                # Formulario de cotización
│   │   └── drones/[slug]/          # Páginas de productos con schemas
│   └── components/
│       ├── Header.tsx              # Navegación sticky
│       ├── HeroVideo.tsx           # Hero con estadísticas
│       ├── ModeloCard.tsx          # Cards expandibles
│       ├── CompareTable.tsx        # Tabla comparativa actualizada
│       ├── FeatureCard.tsx         # Tarjetas de tecnología
│       └── Footer.tsx              # Pie con productos
├── data/
│   └── modelos.json               # Contenido completo de productos
├── public/
│   ├── img/                       # Imágenes WebP de productos
│   └── media/                     # Video hero y assets
└── config files...
```

## 🎯 Productos Implementados

### AgriVolt Titan 150 (`/drones/titan-150`)
- **Tanque**: 70 L (73 L máx.) | **Flujo**: 40 L/min ±5%
- **Características**: Radar 360°, FPV 2K + IR, IP67/IPX6K
- **Uso**: Grandes extensiones, cultivos extensivos

### AgriVolt Pro 100 (`/drones/pro-100`)  
- **Tanque**: 45 L (60 L opc.) | **Flujo**: 24 L/min ±5%
- **Características**: RTK, izaje 60kg, multi-escenario
- **Uso**: Huertos medianos, franjas en ladera

### AgriVolt Edge 70 (`/drones/edge-70`)
- **Tanque**: 37.5 L | **Flujo**: 24 L/min
- **Características**: Visión compuesta, carga rápida 9min
- **Uso**: Operación individual, parcelas fragmentadas

## 📋 Formulario de Cotización (`/cotizar`)

### Campos Básicos (8 requeridos)
1. Nombre y apellidos
2. Correo electrónico  
3. Teléfono / WhatsApp
4. País y estado
5. Necesidad principal (Pulverización, Esparcido, Ambos, Izaje/otros)
6. Tipo de cultivo (Maíz, Trigo, Arroz, Cítricos, etc.)
7. Superficie (< 20 ha, 20–100 ha, 100–300 ha, > 300 ha)
8. Preferencia de contacto (WhatsApp, Llamada, Email)

### Campos Extendidos (Opcionales)
- Terreno y pendiente
- Frecuencia de aplicaciones  
- Ventana de compra
- Módulos de interés
- Presupuesto aproximado
- Mensaje adicional

### Lógica de Envío
- **Con endpoint**: POST JSON a `process.env.NEXT_PUBLIC_FORMS_ENDPOINT`
- **Sin endpoint**: Fallback a `mailto:` con datos encodeados
- **Validación**: Email, teléfono, consentimiento obligatorio
- **UX**: Mensajes de estado, loading states, microcopys

## 🔍 SEO y Schemas

### JSON-LD Implementado
- **Organization**: Datos de AgriVolt (layout.tsx)
- **Product**: Por cada producto con propiedades técnicas
- **FAQPage**: 5 FAQs principales en landing

### Meta Tags
- **Title templates**: Específicos por página
- **Descriptions**: Optimizadas con keywords
- **Open Graph**: Imágenes y metadata por producto
- **Canonical URLs**: Configurados correctamente

## 🏃‍♂️ Comandos

```bash
# Desarrollo
npm run dev

# Build estático (usa output: 'export')
npm run build && npx next export

# Preview local del directorio out
npx serve out

# Lint
npm run lint
```

## 🎨 Design System

### Colores
- **Primario**: `#2d39f1` (variable `--primary`)
- **Fondo oscuro**: `#0b0b0f` (sección tecnología)

### Breakpoints Mobile-First
```css
/* Base (móvil) */
px-4 py-4           

/* Tablet 768px+ */
md:px-8 md:py-8     

/* Desktop 1024px+ */
lg:px-12 lg:py-12   
```

### Tipografía
- **Display**: Space Grotesk (H1, H2, H3, botones principales)
- **Body**: Inter (párrafos, formularios, UI)

## 📊 Performance

- **First Load JS**: ~99.7kB compartido
- **Páginas individuales**: 1-5kB adicionales
- **Imágenes**: WebP con caché 1 año
- **Build time**: ~4-5s optimizado

## 🚀 Deploy en Vercel

1. **Auto-deploy**: Conectar repo GitHub
2. **Configuración**: Detecta Next.js automáticamente  
3. **Variables**: Solo `NEXT_PUBLIC_FORMS_ENDPOINT` (opcional)
4. **Headers**: Configurados en `vercel.json` (cache 1 año para webp|jpg|png|mp4|webm)

### Headers de Caché
```json
{
  "source": "/(.*\\.(webp|jpg|jpeg|png|mp4|webm))",
  "headers": [
    {
      "key": "Cache-Control", 
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```

## ✅ Criterios de Aceptación Cumplidos

- ✅ `npm run build && npx next export` genera `/out` sin errores
- ✅ Páginas de producto con nombres/SEO propuestos y tablas completas  
- ✅ Formulario con 8 campos breves + extendido desplegable
- ✅ JSON-LD Product por modelo + FAQPage en landing
- ✅ Microcopys de privacidad y validación incluidos
- ✅ Sitio 100% estático y optimizado para costo mínimo

## 🛠 Resolución de Problemas

### Build Issues Comunes
```bash
# Si Tailwind no compila:
rm -rf .next node_modules && npm install && npm run build

# Si hay conflictos de versión:
npm list tailwindcss postcss autoprefixer

# Cache limpio en desarrollo:
rm -rf .next && npm run dev
```

### Configuración CSS
- **PostCSS**: Usa `tailwindcss` + `autoprefixer` (no `@tailwindcss/postcss`)
- **Tailwind**: v3.4 estable, NO v4 alpha
- **Variables CSS**: Definidas en `globals.css` con utilidades custom

## 🖼 Especificaciones de Assets

### Video Hero (`/public/media/hero.mp4`)
- **Resolución**: 1920×1080 (Full HD mínimo)
- **Duración**: 10-30 segundos (loop automático)
- **Formato**: MP4 con H.264 codec
- **Tamaño recomendado**: < 5MB para carga rápida
- **Contenido sugerido**: Drone en acción, campo agrícola, movimiento suave

### Imágenes de Productos (`/public/img/`)

#### Titan 150 (`titan-150.webp`)
- **Resolución**: 800×600px (4:3 aspect ratio)
- **Formato**: WebP con calidad 85-90%
- **Tamaño objetivo**: < 200KB
- **Composición**: Drone completo, vista lateral/3/4, fondo neutro

#### Pro 100 (`pro-100.webp`)
- **Resolución**: 800×600px (4:3 aspect ratio)  
- **Formato**: WebP con calidad 85-90%
- **Tamaño objetivo**: < 200KB
- **Composición**: Drone completo, vista lateral/3/4, fondo neutro

#### Edge 70 (`edge-70.webp`)
- **Resolución**: 800×600px (4:3 aspect ratio)
- **Formato**: WebP con calidad 85-90%
- **Tamaño objetivo**: < 200KB  
- **Composición**: Drone completo, vista lateral/3/4, fondo neutro

#### Open Graph (`og-agrivolt.jpg`)
- **Resolución**: 1200×630px (1.91:1 ratio exacto para OG)
- **Formato**: JPG con calidad 85%
- **Tamaño objetivo**: < 300KB
- **Contenido**: Logo AgriVolt + drone + texto "Drones Agrícolas"

### Herramientas Recomendadas
```bash
# Conversión a WebP
npx @squoosh/cli --webp '{"quality":85}' *.jpg

# Optimización
npx imagemin *.webp --out-dir=optimized --plugin=webp

# Verificar dimensiones
file *.webp
```

## 🔧 Personalización

### Contenido Editable
```json
// data/modelos.json - Modificar productos sin tocar código
{
  "modelos": [
    {
      "nombre": "AgriVolt Titan 150",
      "especificaciones": {
        "tanque_spray": "70 L (73 L máx.)",
        "flujo_max": "40 L/min ±5%",
        "tamano_gota": "10–300 μm",
        "velocidad_max": "13.8 m/s"
      },
      "bullets": [
        "Tanque 70 L, flujo 40 L/min",
        "Radar 360°, FPV 2K + térmico", 
        "Resistencia IP67/IPX6K",
        "Esparcido rápido 240 kg/min"
      ]
    }
  ],
  "tecnologias": [
    {
      "title": "Anti‑jamming GNSS y datos",
      "description": "Operación en áreas con interferencia activa."
    }
  ]
}
```

### Variables de Entorno
```bash
# .env.local (opcional)
NEXT_PUBLIC_FORMS_ENDPOINT=https://api.ejemplo.com/cotizaciones

# Para producción en Vercel:
# Dashboard → Settings → Environment Variables
```

### Personalización de Colores
```css
/* src/app/globals.css */
:root {
  --primary: #2d39f1;     /* Color principal - cambiar aquí */
  --bg-dark: #0b0b0f;     /* Fondo sección tecnología */
}
```

---

**🎯 Proyecto COMPLETO y funcionando** - Deploy directo a Vercel con costo prácticamente nulo, performance optimizada y documentación técnica completa 🚁✨