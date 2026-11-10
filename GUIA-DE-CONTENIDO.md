# Guía de contenido del portafolio

Todos los textos de la Home se editan en **dos archivos**, directamente desde GitHub. No necesitas tocar HTML, CSS ni JavaScript.

| Archivo | Qué contiene |
|---|---|
| [`_data/home.yml`](_data/home.yml) | Todos los textos de la Home: menú, hero, datos rápidos, encabezados, Mi enfoque, contacto, CV y pie de página. |
| [`_data/projects.yml`](_data/projects.yml) | Los datos de los cuatro proyectos: tarjetas de la Home, menú "Proyectos" y navegación entre casos. |

---

## Cómo editar un texto desde GitHub

1. Entra a **github.com/ximebissieres/ximebissieres.github.io**.
2. Abre la carpeta **`_data`** y haz clic en **`home.yml`** (o **`projects.yml`**).
3. Haz clic en el **lápiz** ✏️ (arriba a la derecha, "Edit this file").
4. Cambia el texto que quieras.
5. Haz clic en **Commit changes…** → escribe un mensaje corto (por ejemplo "Actualizo bajada del hero") → **Commit changes**.
6. Espera 1 o 2 minutos y abre **https://ximebissieres.github.io**. Si no ves el cambio, recarga con **Ctrl + Shift + R** (Windows) o **Cmd + Shift + R** (Mac).

Para seguir la publicación: pestaña **Actions** del repositorio. Un ✅ verde significa que ya está en línea.

---

## Reglas para no romper nada

- **Cambia solo lo que está después de los dos puntos** ( `:` ). Lo que está antes es el nombre del campo y no se toca.
- **Mantén las comillas dobles** que rodean cada texto: `titulo: "Mi texto"`. Si tu texto necesita comillas dentro, usa comillas tipográficas (“ ”) o simples (' ').
- **No cambies los espacios del inicio de cada línea.** Indican a qué grupo pertenece cada campo.
- Las líneas que empiezan con `#` son comentarios: no se ven en la web.
- **En `projects.yml` los textos van sin comillas.** Si un texto **contiene dos puntos ( : )** o **empieza con `*`, `[` o `¿`**, enciérralo entre comillas dobles: `teaser: "Antes: un formulario. Después: un mapa."`

### Formato especial

| Escribes | Se ve |
|---|---|
| `*texto*` | **texto destacado en rosa** (sin cursiva) |
| `[[texto]]` | texto marcado en amarillo como **pendiente** |

Ejemplo: `titulo: "Entender el problema. *Diseñar la solución.*"`

### Si algo sale mal

Si el archivo queda con un error de formato, GitHub **no publica el cambio** y la web sigue mostrando la versión anterior: nada se rompe en línea. En la pestaña **Actions** verás una ❌ roja. Para arreglarlo, abre el archivo, revisa el último cambio (casi siempre son comillas o espacios) y vuelve a hacer commit. También puedes deshacerlo desde el historial del archivo (**History**).

---

## Qué campo cambia cada texto · `_data/home.yml`

### Pestaña del navegador y buscadores — `seo`

| Texto | Campo |
|---|---|
| Título de la pestaña del navegador | `seo` → `titulo` |
| Descripción que muestran Google, LinkedIn o WhatsApp al compartir el link | `seo` → `descripcion` |

### Menú superior — `menu` (aparece en todas las páginas)

| Texto | Campo |
|---|---|
| Logo: letra gris / letra rosa | `marca_iniciales` / `marca_iniciales_destacada` |
| Nombre junto al logo | `marca_nombre` |
| Inicio · Proyectos · Mi enfoque · Contacto | `inicio` · `proyectos` · `enfoque` · `contacto` |
| "Ver todos los proyectos" (desplegable y menú móvil) | `ver_todos_los_proyectos` |
| Botón del menú en celular: "Menú" / "Cerrar" | `boton_movil_abrir` / `boton_movil_cerrar` |
| Textos para lectores de pantalla y teclado | `saltar_al_contenido`, `marca_descripcion`, `nombre_menu_lector`, `nombre_menu_movil_lector` |

Los proyectos del desplegable salen de `projects.yml` (campos `company` y `menu`).

### Hero — `hero`

| Texto | Campo |
|---|---|
| Etiqueta sobre el nombre ("Product Designer · Contenido y sistemas") | `etiqueta` |
| Nombre (primera línea, gris) | `nombre_linea_1` |
| Apellido (segunda línea, rosa) | `nombre_linea_2` |
| Bajada bajo el nombre | `bajada` |
| Botón principal ("Ver proyectos") | `boton_principal` |
| Botón secundario ("Contacto") | `boton_secundario` |
| Descripción de la foto (para lectores de pantalla) | `foto_descripcion` |
| Iniciales que se ven si la foto no carga | `foto_iniciales` |
| Archivo de la foto | `foto` |

**Cambiar la foto:** sube una imagen nueva a la carpeta `assets/` con el nombre `foto.jpg` (reemplaza la actual). Si usas otro nombre, actualiza el campo `foto`.

### Datos rápidos (fila bajo el hero) — `datos_rapidos`

Cada dato tiene dos campos: `etiqueta` (texto pequeño en mayúsculas) y `texto`.

- **Agregar un dato:** copia un bloque completo (las dos líneas `- etiqueta` y `texto`) y pégalo debajo del último, respetando los espacios.
- **Quitar un dato:** borra sus dos líneas.
- **Años de experiencia:** reemplaza `[[X]]` por el número, por ejemplo `texto: "8 años en equipos de producto"`.

### Sección Proyectos — `proyectos`

| Texto | Campo |
|---|---|
| "Proyectos seleccionados" | `etiqueta` |
| "Cuatro proyectos, cuatro formas de diseñar producto" | `titulo` |
| Bajada bajo el título | `bajada` |
| "Ver proyecto" (aparece en las tarjetas en celular) | `tarjeta_ver_proyecto` |

El contenido de cada tarjeta se edita en `projects.yml` (ver más abajo).

### Mi enfoque — `enfoque`

| Texto | Campo |
|---|---|
| "Mi enfoque" | `etiqueta` |
| "Entender el problema. Diseñar la solución." | `titulo` |
| Descripción bajo el título | `bajada` |
| Nombre de cada capacidad (Research, Estrategia…) | `capacidades` → `nombre` |
| Descripción de cada capacidad | `capacidades` → `descripcion` |
| Tarjeta en rosa y su marca ("Mi base") | `destacada: true` y `marca` |

Para destacar otra capacidad, mueve las líneas `destacada: true` y `marca: "Mi base"` al bloque que quieras. Puedes agregar o quitar capacidades igual que los datos rápidos (la grilla se adapta).

### Contacto y CV — `contacto`

| Texto o enlace | Campo |
|---|---|
| "Contacto" | `etiqueta` |
| "¿Conversamos?" | `titulo` |
| Bajada | `bajada` |
| **Tu WhatsApp**: botón principal (oscuro) que abre una conversación | `whatsapp` → ej. `whatsapp: "+56 9 8189 4577"` |
| Texto del botón ("WhatsApp") | `boton_whatsapp` |
| **Tu email**: botón "Correo", que abre el programa de correo | `email` → ej. `email: "nombre@dominio.com"` |
| Texto del botón ("Correo") | `boton_email` |
| Texto del botón del CV ("Ver mi CV") | `boton_cv` |
| Ruta del CV en PDF | `cv_pdf` |
| Enlace del CV mientras no exista el PDF (Google Drive) | `cv_enlace_alternativo` |

**Número de WhatsApp:** escríbelo con código de país, como prefieras verlo (`+56 9 8189 4577`). Los espacios, el `+`, los guiones y los paréntesis se quitan solos al armar el enlace.

**Botones que se ocultan solos:** si dejas `whatsapp` o `email` vacíos (`""`), ese botón no aparece. "Ver mi CV" siempre está visible.

**Ten en cuenta:** tu sitio es público. El número y el email que escribas aquí quedarán visibles en la web y en el historial de GitHub.

**Agregar tu CV en PDF:** en GitHub, abre la carpeta `assets` → **Add file → Upload files** → arrastra tu PDF y, en el nombre, escribe `cv/Ximena-Bissieres-CV.pdf` → **Commit changes**. El botón "Ver mi CV" lo abrirá automáticamente en una pestaña nueva. Para reemplazarlo más adelante, sube uno nuevo con el mismo nombre.

### Pie de página — `pie`

| Texto | Campo |
|---|---|
| "© 2026 Ximena Bissieres" | `izquierda` |
| "Product Designer · Contenido y sistemas" | `derecha` |

---

## Qué campo cambia cada texto · `_data/projects.yml`

Cada proyecto es un bloque que empieza con `- slug:`. Estos datos se comparten en varios lugares a la vez.

| Texto | Campo | Dónde aparece |
|---|---|---|
| Empresa | `company` | Tarjeta, menú, portada del caso, "Siguiente proyecto" |
| Categoría | `category` | Tarjeta, junto a la empresa |
| Nombre del proyecto | `name` | Título de la tarjeta, "Siguiente proyecto" |
| Descripción breve | `teaser` | Tarjeta (máximo dos líneas, unos 65 caracteres) |
| Texto en el menú desplegable | `menu` | Segunda línea en el menú "Proyectos" |
| Etiqueta del caso | `sector` | Sobre el título, en la página del caso |
| Título del caso | `title_html` | Título grande de la página del caso (`*texto*` en rosa) |
| Portada narrativa del caso (opcional) | `hero` → `titulo`, `bajada`, `etiqueta_descripcion`, `descripcion` | Reemplaza el título y el resumen de la portada del caso. Hoy solo la usa Monchis. Si un proyecto no tiene `hero`, se usa `title_html` |
| Imagen | `cover` | Tarjeta y portada del caso |
| Descripción de la imagen | `cover_alt` | Lectores de pantalla |
| Encuadre de la imagen | `cover_position` | `"50% 0%"` muestra la parte de arriba; `"50% 50%"`, el centro |

**No cambies `slug`**: es la dirección de la página del caso (`/proyectos/monchis/`). El campo `order` define el número (01, 02…); si reordenas los proyectos, cambia también el orden de los bloques en el archivo.

---

## Lo que no está en estos archivos

- **El desarrollo de cada case study** (contexto, rol, decisiones, resultados) está en `proyectos/monchis.html`, `proyectos/latam.html`, `proyectos/santa-isabel.html` y `proyectos/paris.html`. Se puede editar desde GitHub con el mismo lápiz, buscando el texto y cambiándolo, pero contiene HTML: cambia solo las palabras y deja intactos los símbolos `<` `>`.
- **Diseño, colores y tipografía** (`assets/styles.css`) e **interacciones** (`assets/main.js`) no contienen textos de la Home.
