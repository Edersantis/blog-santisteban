---
title: 'Esto es un artículo de ejemplo'
description: 'Publicación de ejemplo para ver el diseño, las etiquetas y los metadatos. Se puede borrar en cuanto haya un artículo real.'
pubDate: 2026-11-18
tags:
  - ejemplo
draft: false
---

> Este texto es un ejemplo. No es un artículo de Eder: está aquí para que el primer despliegue muestre una página real. Se puede eliminar cuando ya no haga falta.

El blog vive en [blog.santisteban.co](https://blog.santisteban.co). Cada artículo es un archivo Markdown en el repositorio, con fecha, descripción y etiquetas. El asistente lo redacta, Eder lo revisa y, cuando queda listo, entra en `main`. Netlify publica el sitio a partir de esa rama.

## Qué se ve en un artículo

La ficha de arriba muestra la fecha, el tiempo de lectura y el autor. Las etiquetas llevan a una página que reúne lo publicado con esa misma marca. Si el artículo lleva imagen de portada, aparece antes del texto. El autor, si no se escribe en la ficha, queda como Eder Santisteban.

## Cómo llega un texto al sitio

1. El asistente crea el archivo en `src/content/blog/` y deja `draft: true`.
2. Eder lo lee y pide los cambios que hagan falta.
3. Cuando el texto está listo, `draft` pasa a `false` y el cambio entra en `main`.
4. Netlify construye el sitio y lo publica solo.

Mientras un artículo sigue en borrador, el build de producción no lo genera, no lo lista y no lo incluye en el RSS ni en el mapa del sitio. En local, con el servidor de desarrollo, el borrador sí se puede abrir para revisarlo.

La versión corta para X y la versión para LinkedIn no van en esta página. Se guardan al lado, en `social/esto-es-un-ejemplo.md`, y tampoco se publican en el sitio.
