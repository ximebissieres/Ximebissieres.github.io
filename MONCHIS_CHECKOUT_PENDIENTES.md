# Monchis · Rediseño del checkout · Pendientes editoriales

Este archivo **no se publica en el sitio** (está excluido en `_config.yml`), pero sí es visible en el repositorio público de GitHub: no escribas aquí datos internos ni nombres. Reúne lo que falta para completar el caso sin inventar información.
Cuando tengas un dato confirmado, edítalo en `proyectos/monchis.html` (contenido) o `_data/projects.yml` (portada) y marca el pendiente como resuelto.

> Regla: si un dato no tiene fuente (dashboard, informe, Figma, documento del equipo), no se publica.

## Estado confirmado hoy

| Funcionalidad | Estado | Fuente |
|---|---|---|
| Cupones | En producción | Confirmado por Ximena |
| Propinas | Diseñada, testeada, en desarrollo; no publicada porque Monchis cerró su operación antes del lanzamiento (en la web: "Monchis cerró su operación antes del lanzamiento") | Confirmado por Ximena |
| Direcciones en el checkout | Diseñado y estimado (PRD: "Datos de entrega", 1 ½ sprint). Alcance publicado **sin confirmar** | PRD Checkout |
| Checkout general | Diseñado y estimado (PRD: 8,75 sprints). Alcance publicado **sin confirmar** | PRD Checkout |

En la web, todo lo no confirmado aparece como "Diseñado"; no se afirma que esté publicado.

---

## Recursos visuales por incorporar (y dónde van)

| Recurso | Dónde se incorpora | Qué demuestra |
|---|---|---|
| Video 1 · Checkout completo | 03 · Bloque 01 (Arquitectura y foco en la compra), después de "Qué decidimos" | Arquitectura, jerarquía de bloques y footer fijo durante el scroll |
| Video 2 · Dirección | 03 · Bloque 02 (Direcciones), antes del esquema del radio (que pasa a segundo plano o se retira) | Ajuste del pin dentro del radio y validaciones de cobertura |
| Video 3 · Cupones | 03 · Bloque 03 (Cupones), después de "Qué decidimos" | Selección, condiciones y aplicación del beneficio |
| Pantallas de la primera propuesta de propinas | 03 · Bloque 04 (Propinas) | Punto de partida antes del discovery |
| Versión de propinas post discovery + versión ajustada post testeo | 04 · "Propinas: validar, aprender e iterar", como comparación compacta junto a los pasos 3 y 5 | Qué cambió y por qué |
| Evidencia de los testeos de propinas | 04 · paso 4 de la cronología | Qué se testeó y qué mejoras surgieron |
| Métricas de cupones | 04 · tarjeta "Cupones" | Uso, aplicaciones exitosas, errores y reclamos |
| Métricas de direcciones | 04 · tarjeta "Direcciones" | Reclamos, contactos, pedidos no entregados/cancelados y tiempos, separando lo atribuible al checkout |

Videos: verticales, con portada (poster), controles, sin autoplay simultáneo, con alternativa visual y respetando prefers-reduced-motion.

## Afirmaciones de la sección 03 por validar con pantallas reales

| Afirmación publicada | Bloque | Qué verificar |
|---|---|---|
| "Mostrar solo lo que corresponde al escenario de cada pedido" | 01 Arquitectura | Que las variantes (envío, retiro, agendado) efectivamente ocultan o cambian bloques (hoy se infiere de las 3 pantallas del hero) |
| Orden de prioridad "entrega, pago y beneficios, resumen" | 01 Arquitectura | Que coincide con el orden real del checkout en Figma |
| La primera propuesta de propinas = porcentaje + monto libre + sugerencia + confirmación sin propina | 04 Propinas | Que esos cuatro elementos estaban en la primera versión diseñada (hoy viene del PRD de checkout) |
| Montos sugeridos, selector reutilizable y límites según el valor del pedido | 04 Propinas | Se presentan como alcance del PRD de propinas, no como primera propuesta. Confirmar a qué versión pertenecen |
| La propina no compite con «Finalizar pedido» | 04 Propinas | Se presenta como necesidad, no como resultado. Mostrar en 04 si la validación lo confirmó |

Notas del PRD de propinas: el equipo de diseño figura como dos personas; el caso no atribuye a Ximena el diseño de los cinco puntos de entrada. Los datos de Pedidos Ya son referencia externa y no se publican. Montos y umbral siguen "a definir": no se publican cifras.

## Prioridad ALTA

| # | Pendiente | Qué necesito | Sección | Qué permitiría afirmar | Dónde buscarlo |
|---|---|---|---|---|---|
| A1 | **Checkout completo antes/después** | Recibidas 3 variantes del checkout nuevo (envío a domicilio, retiro en el local, pedido agendado), usadas en la portada sin modificaciones (datos ficticios de Figma). Falta confirmar qué variantes llegaron a producción. La logística propia del comercio queda fuera del caso: sus diferencias están en el post order, no en el checkout | Portada, Solución | Mostrar la solución con pantallas reales en vez del esquema ilustrativo | Figma del proyecto (link "FIGMA" del PRD Checkout) |
| A2 | **Iteraciones de propinas** | Wireframes de la primera propuesta y de la versión iterada | Decisión 04 (evolución de propinas) | Mostrar visualmente qué cambió y por qué | Figma / archivos del equipo de diseño |
| A3 | **Hallazgos del discovery de Service Design** | Informe o síntesis original de propinas | Investigación (Propinas) y Decisión 04 | Explicar qué hallazgos cuestionaron la primera propuesta | Service Design, Drive/Notion del equipo |
| A4 | **Testeos de propinas** | Método, n.º de participantes, tareas y resultados | Decisión 04 y Validación e impacto | Decir qué validamos y qué aprendimos en los testeos | Service Design / equipo de diseño |
| A5 | **Alcance de direcciones publicado** | Qué partes llegaron a producción: mapa visible, ajuste del pin, radio de 50 m, cambio entre direcciones con cobertura, aviso de ubicación, bloqueo sin cobertura | Decisión 02 y lista de estados de Solución | Cambiar "Diseñado" por "En producción" donde corresponda | Producto (PM del PRD de direcciones), Jira, release notes |
| A6 | **Alcance del checkout general publicado** | Qué versión salió y con qué componentes (pago, resumen, botón de finalizar) | Solución y resumen (Impacto) | Afirmar qué parte del rediseño se publicó | Producto, Jira, release notes |
| A7 | **Conversión y abandono** | Funnel del checkout antes/después, con la definición de cada evento, fechas exactas y período | Validación e impacto, resumen (Impacto) | Presentar resultados medidos (no objetivos del PRD) | Amplitude |

**Nota sobre el funnel del PRD:** el PRD Checkout incluye un gráfico de Amplitude del funnel del checkout (desde BEGIN_CHECKOUT hasta la vuelta a la home, "Since Dec"). Las cifras no se copian aquí porque este archivo vive en un repositorio público. **No se publicó** porque falta el año, el período exacto y la definición de cada evento, y porque es una línea base, no un resultado del rediseño.

## Prioridad MEDIA

| # | Pendiente | Qué necesito | Sección | Qué permitiría afirmar | Dónde buscarlo |
|---|---|---|---|---|---|
| M1 | **Debate sobre jerarquía y edición** | Minuta, hilo, comentarios en Figma o documento donde se discutió qué se podía editar en el checkout | Decisión 01 | Respaldar la alternativa discutida y el acuerdo con los PM | Slack, Figma, Confluence/Notion |
| M2 | **Capturas reales de cupones en producción** | Tarjeta de cupones, pantalla de cupones y detalle de condiciones, sin datos reales | Decisión 03 | Mostrar el flujo publicado con pantallas reales | App en producción o Figma final; PRD "User App - Flujo Cupones" (referenciado en el PRD Checkout) |
| M3 | **Usabilidad del checkout** | Resultados de pruebas o feedback cualitativo del checkout nuevo | Validación e impacto | Mostrar validación con personas usuarias además de la del equipo | Service Design / Producto |
| M4 | **Uso de cupones y comprensión de beneficios** | Métricas de uso de cupones y reclamos por beneficios antes/después | Validación e impacto, Decisión 03 | Medir el efecto del flujo publicado | Amplitude, Contact Center |
| M5 | **Contactos a soporte por dirección** | Contact rate por dirección antes/después | Validación e impacto | Medir el efecto de las mejoras de direcciones | Contact Center / CX |
| M6 | **Link de Figma publicable** | Un link de Figma con acceso de lectura y sin datos sensibles | Aprendizajes (botón "Ver flujos en Figma", hoy retirado) | Permitir revisar los flujos | Figma |
| M7 | **Autoría del flujo de cupones** | Quién diseñó qué en cupones | Decisión 03 (hoy dice "Equipo") | Precisar tu contribución | Equipo de diseño |
| M8 | **N.º de entrevistas y observaciones (direcciones)** | Cantidad real del discovery de direcciones | Investigación (Direcciones) | Dimensionar el research | Service Design |
| M10 | **Microcopy final de los estados críticos** | Textos finales (en voseo) de: confirmación de dirección, ubicación distinta a la dirección, sin cobertura y cupón aplicado | Solución ("Reglas de contenido para los estados críticos") | Citar ejemplos reales de microcopy, no solo las reglas | Figma / textos entregados por Ximena |
| M9 | **Contradicción en el caso anterior** | El caso de direcciones decía que "el checkout ni siquiera mostraba la dirección", pero la pantalla "AS IS" del PRD sí la muestra. Se quitó esa afirmación | Contexto | Confirmar cómo era el checkout anterior | Ximena / equipo |

> **Registro:** el copy de la app va en voseo rioplatense (la app es paraguaya): "Confirmá", "elegí", "querés". El relato del caso mantiene la voz del portafolio.

## Fuera de alcance (no se tocó, requiere decisión)

- **Tarjeta de la Home y menú:** actualizados a "Rediseño del checkout" (`name`, `menu`, `teaser`). La ilustración de la tarjeta sigue siendo el mapa (`cover: illustration`) hasta tener una pantalla real del checkout (A1).
- **Imagen de portada:** usa 3 pantallas reales del checkout (`hero.pantallas` en `_data/projects.yml`), exportadas de Figma y publicadas sin modificaciones. Las capturas de Figma contienen datos ficticios: solo se anonimizan si Ximena lo pide expresamente.
- **Imagen `monchis-whatsapp-ejemplo.webp`:** ya no se usa en el caso (era contexto del enfoque de direcciones). Sigue en el repo, anonimizada.
- **Historial de GitHub:** el repositorio es público y sus versiones anteriores todavía contienen las imágenes originales sin anonimizar (WhatsApp, ticket, Vendor Tool). Borrarlas requiere reescribir el historial.

## Retirado de la página pública

- Placeholders visibles: `[cifras por verificar]`, `[N entrevistas y observaciones]`, `[antes] → [después]`, `[periodo]`, `[link]`, copy del aviso y detalle técnico.
- Espacios "Imagen pendiente" (formulario antes/después, benchmark de checkouts).
- Capítulos del enfoque de direcciones: journey de tres iniciativas (Antes/Después), decisiones "Referencias y mapa" y "Advertir en vez de bloquear" como decisiones propias. Su contenido útil se integró en la Decisión 02. Respaldo de la versión anterior: commit `bfd22f3` y siguientes en el historial.
