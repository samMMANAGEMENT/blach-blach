# Documentación de Configuración - Blach Blach E-commerce

Este proyecto ha sido diseñado para ser fácilmente personalizable y escalable. A continuación se detallan los puntos clave para modificar la identidad visual y el contenido.

## 1. Estilos de Marca (Tailwind CSS 4)

Los estilos globales y las variables de Tailwind se encuentran en `app/globals.css`. Gracias a Tailwind CSS 4, la configuración es ahora más directa mediante variables CSS en el bloque `@theme`.

### Colores
Para cambiar los colores principales, edite las variables dentro de `@theme` en `app/globals.css`:
```css
@theme {
  --color-primary: #ED0D15;   /* Color principal (Rojo Blach) */
  --color-secondary: #CC2725; /* Color de acento/hover */
  --color-surface-dark: #121212; /* Color de tarjetas y superficies */
}
```

### Tipografía
El proyecto utiliza fuentes de Google vía `next/font`. Para cambiar las fuentes:
1. Modifique las importaciones en `app/layout.tsx`.
2. Actualice las variables en `app/globals.css`:
```css
--font-display: var(--font-orbitron); /* Para títulos y logos */
--font-body: var(--font-inter);       /* Para textos descriptivos */
```

## 2. Configuración Centralizada

Para facilitar la gestión del sitio sin tocar el código de los componentes, se han creado archivos de configuración en la carpeta `/configs`:

- **`configs/brand.ts`**: Contiene metadatos de la marca (nombres, colores de referencia).
- **`configs/content.ts`**: Contiene todo el texto del sitio, incluyendo:
  - Textos del Hero.
  - Lista de características (Features).
  - Catálogo de productos (Nombres, precios, imágenes, opciones).
  - Textos de contacto y CTA.

## 3. Estructura del Proyecto

- `app/`: Rutas y Layout principal (Next.js App Router).
- `components/`:
  - `layout/`: Componentes globales como Navbar y Footer.
  - `home/`: Secciones específicas de la página de inicio.
- `public/`: Assets estáticos (imágenes, iconos).
- `configs/`: Archivos de configuración de datos y marca.

## 4. Seguridad y Buenas Prácticas

- **Frontend Seguro**: Se utiliza el modo estricto de React y las optimizaciones nativas de Next.js para prevenir ataques XSS comunes.
- **Optimización de Imágenes**: Los productos utilizan el componente `img` con optimización de carga (puedes migrar a `next/image` para mayor rendimiento).
- **Responsividad**: Cada componente utiliza clases de Tailwind responsivas (`md:`, `lg:`, `sm:`) asegurando que el diseño sea fiel en móviles, tablets y escritorio.

## 5. Cómo expandir

Para añadir un nuevo producto, simplemente agregue un nuevo objeto al array `products` en `configs/content.ts`. El componente `ProductGrid` se actualizará automáticamente.
