# Monchis · Rediseño del checkout · Pendientes editoriales

Este archivo **no se publica en el sitio** (está excluido en `_config.yml`), pero sí es visible en el repositorio público de GitHub: no escribas aquí datos internos ni nombres. Reúne lo que falta para completar el caso sin inventar información.
Cuando tengas un dato confirmado, edítalo en `proyectos/monchis.html` (contenido) o `_data/projects.yml` (portada) y marca el pendiente como resuelto.

> Regla: si un dato no tiene fuente (dashboard, informe, Figma, documento del equipo), no se publica.

## Estado confirmado hoy

| Funcionalidad | Estado | Fuente |
|---|---|---|
| Cupones | En producción | Confirmado por Ximena |
| Propinas | Diseñada, testeada, en desarrollo; no publicada (el proyecto se interrumpió) | Confirmado por Ximena |
| Direcciones en el checkout | Diseñado y estimado (PRD: "Datos de entrega", 1 ½ sprint). Alcance publicado **sin confirmar** | PRD Checkout |
| Checkout general | Diseñado y estimado (PRD: 8,75 sprints). Alcance publicado **sin confirmar** | PRD Checkout |

En la web, todo lo no confirmado aparece como "Diseñado"; no se afirma que esté publicado.

---

## Prioridad ALTA

| # | Pendiente | Qué necesito | Sección | Qué permitiría afirmar | Dónde buscarlo |
|---|---|---|---|---|---|
| A1 | **Checkout completo antes/después** | Exportar el checkout anterior y el nuevo (pantallas completas, sin datos reales) | Portada (reemplaza el mapa), Contexto, Solución | Mostrar la solución con pantallas reales en vez del esquema ilustrativo | Figma del proyecto (link "FIGMA" del PRD Checkout) |
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
| M9 | **Contradicción en el caso anterior** | El caso de direcciones decía que "el checkout ni siquiera mostraba la dirección", pero la pantalla "AS IS" del PRD sí la muestra. Se quitó esa afirmación | Contexto | Confirmar cómo era el checkout anterior | Ximena / equipo |

## Fuera de alcance (no se tocó, requiere decisión)

- **Tarjeta de la Home y menú:** siguen diciendo "Rediseño de direcciones" (`_data/projects.yml` → `name`, `menu`, `teaser`) porque la instrucción fue no cambiar la Home. Si quieres que la tarjeta diga "Rediseño del checkout", hay que cambiar esos tres campos. También aparece en la tarjeta de "Siguiente proyecto" al final de Paris.
- **Imagen de portada:** el hero sigue usando el componente de mapa (`monchis-punto-exacto.webp`) hasta tener una pantalla real del checkout (A1).
- **Imagen `monchis-whatsapp-ejemplo.webp`:** ya no se usa en el caso (era contexto del enfoque de direcciones). Sigue en el repo, anonimizada.
- **Historial de GitHub:** el repositorio es público y sus versiones anteriores todavía contienen las imágenes originales sin anonimizar (WhatsApp, ticket, Vendor Tool). Borrarlas requiere reescribir el historial.

## Retirado de la página pública

- Placeholders visibles: `[cifras por verificar]`, `[N entrevistas y observaciones]`, `[antes] → [después]`, `[periodo]`, `[link]`, copy del aviso y detalle técnico.
- Espacios "Imagen pendiente" (formulario antes/después, benchmark de checkouts).
- Capítulos del enfoque de direcciones: journey de tres iniciativas (Antes/Después), decisiones "Referencias y mapa" y "Advertir en vez de bloquear" como decisiones propias. Su contenido útil se integró en la Decisión 02. Respaldo de la versión anterior: commit `bfd22f3` y siguientes en el historial.
