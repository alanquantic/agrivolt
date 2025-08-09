# 🔧 Troubleshooting Guide - AgriVolt Project

## 📋 Historial de Problemas Resueltos

### 1. Conflicto de Versiones de Tailwind CSS

**Problema**: Build fallaba con error de PostCSS sobre `@tailwindcss/postcss`
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package
```

**Causa Raíz**: 
- Tailwind CSS v4 (alpha) instalado inicialmente
- Incompatibilidad con PostCSS en Next.js 15
- Configuración mixta de plugins

**Solución**:
```bash
# 1. Desinstalar versión conflictiva
npm uninstall tailwindcss @tailwindcss/postcss

# 2. Instalar versión estable
npm install tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0 --save-dev

# 3. Configurar PostCSS correctamente
```

**Archivo afectado**: `postcss.config.js`
```javascript
// ❌ INCORRECTO (v4 alpha)
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

// ✅ CORRECTO (v3.4 estable)
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Estado**: ✅ **RESUELTO** - Build exitoso con Tailwind v3.4

---

### 2. Variables CSS y Utilidades Personalizadas

**Problema**: Clases como `bg-primary`, `text-primary` no funcionaban en production

**Causa Raíz**: 
- Tailwind v3 no reconoce automáticamente `color-mix()` CSS
- Variables CSS definidas pero sin utilidades correspondientes

**Solución**: Agregar utilidades custom en `globals.css`
```css
/* Utilidades personalizadas para compatibilidad */
.bg-primary {
  background-color: var(--primary);
}

.text-primary {
  color: var(--primary);
}

.bg-primary\/10 {
  background-color: color-mix(in srgb, var(--primary) 10%, transparent);
}

.bg-primary\/12 {
  background-color: color-mix(in srgb, var(--primary) 12%, transparent);
}

.bg-primary\/13 {
  background-color: color-mix(in srgb, var(--primary) 13%, transparent);
}

.bg-dark {
  background-color: var(--bg-dark);
}
```

**Estado**: ✅ **RESUELTO** - Todos los colores funcionando

---

### 3. Errores de Tipos TypeScript

**Problema**: Build fallaba con error de propiedades inexistentes
```
Type error: Property 'titulo' does not exist on type '{ title: string; description: string; }'
```

**Causa Raíz**: 
- Inconsistencia entre estructura de datos JSON y props de componentes
- Mezcla de nombres en español e inglés

**Solución**: Estandarizar propiedades en `data/modelos.json`
```json
// ❌ INCORRECTO
{
  "titulo": "Anti‑jamming GNSS y datos",
  "descripcion": "Operación en áreas..."
}

// ✅ CORRECTO  
{
  "title": "Anti‑jamming GNSS y datos",
  "description": "Operación en áreas..."
}
```

**Estado**: ✅ **RESUELTO** - Tipos coherentes en todo el proyecto

---

### 4. Archivos de Debugging Causando Warnings

**Problema**: Page `/baseline` causaba warnings innecesarios en build
```
Warning: Using `<img>` could result in slower LCP and higher bandwidth
```

**Causa Raíz**: 
- Página temporal de debugging no eliminada
- Uso de `<img>` directo en lugar de `next/image`

**Solución**: Eliminar archivos temporales
```bash
rm src/app/baseline/page.tsx
```

**Estado**: ✅ **RESUELTO** - Solo warnings menores controlados

---

## 🛠 Comandos de Diagnóstico

### Verificar Instalación
```bash
# Versiones de dependencias críticas
npm list tailwindcss postcss autoprefixer

# Debería mostrar:
# tailwindcss@3.4.x
# postcss@8.4.x  
# autoprefixer@10.4.x
```

### Limpiar Cache Completo
```bash
# Limpiar todos los caches
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Probar Build Local
```bash
# Build completo
npm run build

# Preview estático  
npx serve out
```

### Verificar CSS
```bash
# Inspeccionar CSS generado
cat .next/static/css/*.css | grep "primary"

# Debería mostrar las variables CSS
```

## 📚 Lecciones Aprendidas

### 1. **Versiones Estables Primero**
- Usar Tailwind v3.4 en lugar de v4 alpha
- Next.js 15 + React 19 funcionan bien juntos
- PostCSS requiere configuración específica

### 2. **TypeScript Estricto**  
- Definir interfaces claras para props
- Mantener consistencia en nombres de propiedades
- Usar tipos explícitos en lugar de `any`

### 3. **Build en Múltiples Entornos**
- Probar build local antes de push
- Verificar que Vercel build funcione
- Monitorear warnings aunque no bloqueen

### 4. **CSS Custom con Tailwind**
- Usar `globals.css` para utilidades que Tailwind no cubre
- Variables CSS con fallbacks
- `color-mix()` requiere utilidades explícitas en v3

## 🚨 Red Flags para Evitar

❌ **Instalar Tailwind v4** (alpha, inestable)  
❌ **Mezclar `@tailwindcss/postcss` con `tailwindcss`**  
❌ **Usar `any` en TypeScript**  
❌ **Dejar archivos de debugging en production**  
❌ **No probar build local antes de deploy**

## ✅ Checklist Pre-Deploy

- [ ] `npm run build` exitoso localmente
- [ ] Solo warnings menores (img, etc.)
- [ ] Variables CSS funcionando  
- [ ] Tipos TypeScript correctos
- [ ] No archivos temporales en repo
- [ ] `postcss.config.js` con configuración v3
- [ ] Dependencias estables instaladas

---

**📝 Nota**: Este documento sirve como referencia para futuras sesiones y onboarding de desarrolladores al proyecto AgriVolt.
