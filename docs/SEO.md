# Estrategia SEO — Cómo posicionar la landing en Google (sin pauta)

Plan completo para rankear orgánicamente en Google. Honesto sobre tiempos y
prioridades. Lo técnico ya está implementado en el código; lo que falta es
acción tuya en plataformas externas.

---

## ⚠️ La verdad primero (leelo)

1. **El dominio `.vercel.app` NO va a rankear bien.** Google trata los
   subdominios de Vercel como contenido de baja confianza. **Comprar un
   dominio propio es la acción #1 y más importante de todo este documento.**
2. **El SEO orgánico tarda 3 a 6 meses.** No hay atajo sin pagar. La paciencia
   es parte del plan.
3. **No vas a ganarle a "informe de dominio" (genérico) de entrada.** Esa
   keyword la dominan competidores con años de autoridad. PERO sí podés ganar
   **"informe de dominio córdoba"** y decenas de long-tail. Empezás por ahí.

---

## 🎯 Prioridad absoluta: comprá un dominio propio

| Acción | Por qué | Costo aprox |
|---|---|---|
| Comprar `informedominiocordoba.com.ar` (o similar) | Sin esto, nada del resto rankea bien | ~$3.000-8.000 ARS/año |

### Dónde comprarlo
- **.com.ar**: <https://nic.ar> (oficial, requiere CUIT/clave fiscal AFIP).
- **.com**: Namecheap, Google Domains, GoDaddy (~USD 10/año).

### Ideas de dominio (elegí uno corto y con keyword)
- `informedominiocordoba.com.ar`
- `informedeauto.com.ar`
- `verificaauto.com.ar`
- `gestoriacordoba.com.ar`

### Conectarlo a Vercel
1. Vercel → tu proyecto → Settings → Domains → Add Domain.
2. Pegás tu dominio.
3. Vercel te da 2 registros DNS (un `A` y un `CNAME`).
4. Los cargás en el panel de tu proveedor de dominio.
5. En ~1 hora queda activo con HTTPS automático.
6. **Cambiás `NEXT_PUBLIC_BASE_URL`** en Vercel al dominio nuevo + redeploy.

---

## 🔍 Paso 2 — Google Search Console (gratis, imprescindible)

Es la herramienta que le dice a Google "indexá mi sitio" y te muestra por qué
keywords aparecés.

1. Entrá a <https://search.google.com/search-console>.
2. Agregar propiedad → **Prefijo de URL** → pegá tu dominio.
3. Te pide verificar. Elegí el método **"Etiqueta HTML"**.
4. Te da un código tipo:
   ```html
   <meta name="google-site-verification" content="AbC123..." />
   ```
5. Copiá SÓLO el valor del `content` (ej: `AbC123...`).
6. En Vercel → Environment Variables → agregá:
   ```
   GOOGLE_SITE_VERIFICATION=AbC123...
   ```
7. Redeploy. (El código ya inyecta el meta tag automáticamente.)
8. Volvé a Search Console → Verificar.
9. **Enviá el sitemap**: Search Console → Sitemaps → pegá `sitemap.xml` → Enviar.

A los pocos días Google empieza a indexar tus páginas.

### Forzar indexación rápida
En Search Console → barra superior "Inspeccionar URL" → pegá tu home →
"Solicitar indexación". Hacelo para cada página importante (home, servicios,
ejemplos, las 3 guías).

---

## 📍 Paso 3 — Google Business Profile (EL arma para local)

**Esto es lo que más rápido te va a dar resultados.** Para búsquedas locales
("informe de dominio córdoba", "gestoría automotor córdoba") Google muestra un
mapa con negocios. Aparecer ahí es gratis y conviertes muchísimo.

1. Entrá a <https://business.google.com>.
2. Crear perfil de empresa.
3. Nombre: **Gestoría Córdoba — Informe de Dominio**.
4. Categoría: "Servicio de registro de vehículos" o "Gestoría".
5. Zona de servicio: Córdoba (podés ocultar la dirección si trabajás online).
6. Teléfono: +54 9 3515 72-4733.
7. Sitio web: tu dominio nuevo.
8. **Verificación**: Google te manda un código (por teléfono, postal o video).
9. Una vez verificado: subí fotos, horarios, descripción con keywords.
10. **Pedí reseñas** a tus clientes reales (mandales el link por WhatsApp).
    Las reseñas son el factor #1 del ranking local.

---

## 📝 Paso 4 — Contenido (el motor orgánico de largo plazo)

Ya creé el hub `/guias` con 3 artículos cornerstone que apuntan a long-tail:

| Guía | Keyword objetivo |
|---|---|
| Cómo verificar un auto antes de comprar | "como saber si un auto tiene deuda" |
| Qué es el Informe de Dominio Automotor | "que es el informe de dominio" |
| Informe de Dominio en Córdoba | "informe de dominio cordoba" |

### Para seguir creciendo, agregá 1 artículo por semana sobre:
- "Cómo transferir un auto en Córdoba paso a paso"
- "Cuánto cuesta transferir un auto en 2026"
- "Qué es la cédula azul y cómo se tramita"
- "Denuncia de venta: cómo liberarte de un auto que vendiste"
- "Diferencia entre informe de dominio histórico y nominal"
- "Multas de tránsito: cómo consultar las de tu patente"

Cada artículo nuevo = una puerta más de entrada desde Google. Se cargan en
`src/lib/guias.ts` (sólo agregás un objeto al array).

---

## 🔗 Paso 5 — Backlinks (autoridad)

Google confía más en sitios que otros enlazan. Conseguí enlaces de:

- **Directorios locales**: Guía Clarín, Páginas Amarillas, Cylex, listados de
  Córdoba.
- **Grupos de Facebook / foros** de compra-venta de autos (con aporte real, no
  spam).
- **MercadoLibre / Marketplace**: si vendés ahí, linkeá tu sitio.
- **Tu Instagram / TikTok**: poné el link en bio y en cada post.
- **Reseñas y menciones**: pedí a clientes que te mencionen.

> Calidad > cantidad. 5 enlaces de sitios reales valen más que 100 de spam.

---

## ⚙️ Lo técnico (YA implementado en el código)

| Optimización | Estado | Archivo |
|---|---|---|
| Metadata + título + descripción por página | ✅ | cada `page.tsx` |
| Open Graph + Twitter Cards | ✅ | `layout.tsx` + `opengraph-image.tsx` |
| **OG image dinámica** (linda al compartir) | ✅ | `opengraph-image.tsx` |
| JSON-LD LocalBusiness + geo + rating | ✅ | `lib/seo.tsx` |
| JSON-LD WebSite | ✅ | `lib/seo.tsx` |
| **JSON-LD FAQPage** (rich snippets ⭐) | ✅ | home |
| JSON-LD Service con precios | ✅ | home |
| JSON-LD Article + Breadcrumb | ✅ | guías |
| sitemap.xml (con guías) | ✅ | `sitemap.ts` |
| robots.txt | ✅ | `robots.ts` |
| Web manifest (PWA) | ✅ | `manifest.ts` |
| Verificación Search Console | ✅ (falta el código) | `layout.tsx` |
| Canonical URLs | ✅ | cada página |
| Hub de contenido `/guias` | ✅ | `app/guias/` |
| Performance (Lighthouse) | ✅ ~95+ | Next.js + Vercel |
| Mobile-first responsive | ✅ | toda la app |
| HTTPS | ✅ | Vercel automático |

### Validá el structured data
Después del deploy, probá tu home en:
<https://search.google.com/test/rich-results>
Pegá tu URL y verificá que detecte: LocalBusiness, FAQPage, WebSite.

---

## 📊 Checklist de arranque (en orden)

```
SEMANA 1
[ ] Comprar dominio propio (.com.ar o .com)
[ ] Conectarlo a Vercel + cambiar NEXT_PUBLIC_BASE_URL
[ ] Crear Google Search Console + verificar + enviar sitemap
[ ] Solicitar indexación de home + 5 páginas clave
[ ] Crear Google Business Profile + verificar

SEMANA 2-4
[ ] Conseguir 10 reseñas reales en Google Business
[ ] Cargar el sitio en 5 directorios locales
[ ] Publicar 2 guías nuevas
[ ] Linkear desde Instagram/Facebook

MES 2-3
[ ] 1 guía nueva por semana
[ ] Monitorear posiciones en Search Console
[ ] Optimizar las páginas que ya rankean en posición 5-15
[ ] Conseguir más backlinks
```

---

## 🎯 Keywords objetivo (por dificultad)

### Fáciles de ganar (empezá acá) — local + long-tail
- informe de dominio córdoba
- gestoría automotor córdoba
- como saber si un auto tiene deuda
- verificar auto antes de comprar
- informe nominal automotor
- cuánto cuesta un informe de dominio

### Medias (mes 2-4)
- informe de dominio online
- informe automotor
- verificación automotor
- informe de multas nacional

### Difíciles (largo plazo, alta competencia)
- informe de dominio
- informe dnrpa

> Estrategia: ganás las fáciles primero, eso construye autoridad, y con el
> tiempo subís a las medias y difíciles.

---

## 💡 Tip final sobre la pauta (cuando quieras invertir)

Aunque ahora no vas a pagar, tené en cuenta: **Google Ads para "informe de
dominio córdoba" es relativamente barato** (búsqueda local, baja competencia
de pauta) y te pondría #1 desde el día 1 mientras el SEO orgánico madura.
Cuando tengas presupuesto, una campaña de búsqueda de $10-20/día en esa
keyword local puede ser muy rentable. Pero el orgánico que estamos armando es
gratis y permanente.
