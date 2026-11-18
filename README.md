# Blog de Eder Santisteban

Sitio estático del blog personal, en español. Se publica en [https://blog.santisteban.co](https://blog.santisteban.co).

Está hecho con [Astro](https://astro.build/) a partir de la plantilla oficial de blog. Netlify construye la rama `main` y publica la carpeta `dist`. El archivo `netlify.toml` ya trae el comando de build, el directorio de salida y la versión de Node.

## Requisitos

- Node.js 22 (el proyecto pide 22.23.4 o superior; ver `package.json`)
- npm

## Cómo correrlo en local

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:4321`.

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor local, con recarga al guardar |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` para revisar el resultado del build |

En local, los artículos con `draft: true` sí se ven, para poder revisarlos. En el build de producción no.

## Cómo agregar un artículo

1. Crea `src/content/blog/<slug>.md`. El nombre del archivo es la URL: `src/content/blog/mi-nota.md` se publica en `/blog/mi-nota/`.
2. Copia esta ficha al inicio del archivo:

```yaml
---
title: 'Título del artículo'
description: 'Una o dos frases. Se usan en el listado, en el RSS y al compartir.'
pubDate: 2026-11-18
# updatedDate: 2026-11-20
tags:
  - inteligencia artificial
# heroImage: '../../assets/mi-nota.jpg'
draft: true
# author: Eder Santisteban
---
```

3. Escribe el artículo en Markdown debajo de la ficha. También vale un archivo `.mdx` si hace falta un componente.
4. Opcional: copia `social/_plantilla.md` a `social/<slug>.md` y redacta el post de X y el de LinkedIn.
5. Revisa en local con `npm run dev`.

Fechas en formato `AAAA-MM-DD`. Si omites `author`, queda `Eder Santisteban`. Si omites `draft`, el artículo se publica. `heroImage` es una ruta relativa al archivo del artículo, hacia una imagen en `src/assets/`.

### Campos

| Campo | Obligatorio | Notas |
| --- | --- | --- |
| `title` | sí | Título visible |
| `description` | sí | Resumen corto |
| `pubDate` | sí | Fecha de publicación |
| `updatedDate` | no | Si está, se muestra «Actualizado el…» |
| `tags` | no | Lista. Cada etiqueta tiene su página |
| `heroImage` | no | Imagen de portada |
| `draft` | no | `true` o `false`. Por defecto `false` |
| `author` | no | Por defecto `Eder Santisteban` |

## Flujo de publicación

1. El asistente escribe el artículo con `draft: true` y, si aplica, el archivo en `social/`.
2. Eder lo revisa (en local o en el pull request) y pide cambios.
3. Cuando el texto está listo, `draft` pasa a `false`.
4. El cambio se fusiona en `main`.
5. Netlify detecta el push, corre `npm run build` y publica `dist/`.

Un borrador no entra en el HTML de producción: no tiene página, no sale en el inicio ni en el blog, no aparece en las etiquetas, ni en el RSS, ni en el sitemap. Así se puede dejar el archivo en el repositorio sin publicarlo.

## Posts para X y LinkedIn

La carpeta `social/` está fuera de `src/` a propósito. Astro no la compila.

- `social/_plantilla.md` es la plantilla.
- `social/<slug>.md` acompaña a `src/content/blog/<slug>.md`.

Esos textos se publican a mano en cada red, después de la revisión. El sitio no los muestra.

## Despliegue en Netlify

`netlify.toml` ya define:

- comando: `npm run build`
- carpeta publicada: `dist`
- Node: 22

Pasos cuando se conecte el repositorio:

1. En Netlify, importa este repositorio.
2. Deja la rama de producción en `main`. Netlify lee `netlify.toml`; no hace falta reescribir el comando ni la carpeta.
3. El primer deploy crea un dominio `https://<nombre-del-sitio>.netlify.app`. Anota ese nombre: hace falta para el DNS.

## DNS en Cloudflare

El dominio `santisteban.co` está en Cloudflare. Para servir el blog en `blog.santisteban.co`:

1. En Cloudflare, crea un registro **CNAME**.
   - Nombre: `blog`
   - Destino: `<nombre-del-sitio>.netlify.app`
   - Estado del proxy: **solo DNS** (nube gris). La nube naranja impide que Netlify emita el certificado.
2. En Netlify, en el sitio, abre Domain management y agrega el dominio personalizado `blog.santisteban.co`.
3. Espera a que Netlify marque el certificado SSL como listo. Puede tardar unos minutos después de que el CNAME responda.

Hasta que ese dominio esté conectado, el sitio se ve en el subdominio `.netlify.app`.

## Estructura

```text
├── netlify.toml
├── astro.config.mjs          # site, salida estática, sitemap
├── public/                   # favicon, robots, imagen social
├── social/                   # X y LinkedIn; no se publica
│   ├── _plantilla.md
│   └── <slug>.md
└── src/
    ├── components/
    ├── content/blog/         # un archivo por artículo
    ├── content.config.ts     # esquema de la ficha
    ├── layouts/
    ├── lib/posts.ts          # borradores, etiquetas, tiempo de lectura
    ├── pages/
    │   ├── index.astro       # inicio
    │   ├── acerca.astro
    │   ├── blog/
    │   ├── etiquetas/
    │   └── rss.xml.js
    └── styles/global.css
```

Hay ocho artículos de muestra en `src/content/blog/`, con prefijo `ejemplo-` y etiqueta `ejemplo`, publicados (`draft: false`) para que el sitio no salga vacío. Se borran todos de una vez cuando haya textos reales. La plantilla de X y LinkedIn sigue en `social/_plantilla.md`.
