# Guía de Deploy en Vercel

Repo: <https://github.com/alejo30nieva/landing-informe-de-dominio->
Build verificado localmente: ✅ Next.js 14.2.15 — 13 rutas — sin errores.

---

## Paso 1 · Importar el proyecto

1. Entrá a **<https://vercel.com/new>** (logueate si hace falta).
2. Click en **"Import Git Repository"**.
3. Elegí (o conectá) tu cuenta de GitHub **alejo30nieva**.
4. Buscá `landing-informe-de-dominio-` y click en **"Import"**.
5. Framework Preset: **Next.js** (lo detecta solo).
6. Root Directory: `.` (por defecto).
7. Build Command, Output Dir, Install Command: dejá los valores por defecto.

**NO hagas click en "Deploy" todavía.** Primero cargá las env vars (paso 2).

---

## Paso 2 · Cargar Variables de Entorno

En la misma pantalla de import, abrí la sección **"Environment Variables"**
y agregá una por una. Marcá las tres casillas (`Production`, `Preview`,
`Development`) en cada una.

### Mínimas para arrancar (sin Supabase ni MP)

| Key | Value |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | `https://TU-PROYECTO.vercel.app` ← lo cambiás cuando sepas el dominio |
| `NEXT_PUBLIC_WA_PHONE` | `5493515724733` |
| `NEXT_PUBLIC_INFORME_PRICE` | `9900` |
| `INFORME_PRICE_ARS` | `9900` |
| `BANK_TITULAR` | `Gestoría Córdoba` |
| `BANK_NAME` | `Mercado Pago` |
| `BANK_ALIAS` | `tu.alias.mp` |
| `BANK_CBU` | `0000003100012345678901` |

> Con sólo esto **la landing ya funciona**: form, checkout por transferencia/QR con alias, comprobante por WhatsApp, /servicios, /ejemplos, legales. Lo que NO funciona aún: MP automático y persistencia de leads.

### Para activar Supabase (persistencia de leads)

| Key | Value |
|---|---|
| `SUPABASE_URL` | `https://xxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_URL` | igual al anterior |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (de Supabase Settings → API) |

> Primero ejecutá `supabase/schema.sql` en el SQL Editor de tu proyecto Supabase.

### Para activar MercadoPago Checkout Pro (tarjeta + cuenta MP)

| Key | Value |
|---|---|
| `MP_ACCESS_TOKEN` | `APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

> En MercadoPago developers → Webhooks, agregá: `https://TU-DOMINIO.vercel.app/api/webhook/mercadopago` evento `payment`.

### Opcionales

| Key | Value |
|---|---|
| `BANK_QR_URL` | URL pública de tu QR de Mercado Pago (o vacío) |
| `RESEND_API_KEY` | si querés mandar emails automáticos |
| `RESEND_FROM` | `"Gestoría Córdoba <no-reply@tudominio.com>"` |
| `WHATSAPP_TOKEN` | si vas a usar WhatsApp Cloud API de Meta |
| `WHATSAPP_PHONE_ID` | ídem |
| `ADMIN_WHATSAPP_PHONE` | `5493515724733` (para que te llegue aviso a vos) |

---

## Paso 3 · Deploy

1. Click en **"Deploy"**.
2. En 1–2 minutos vas a tener una URL `https://landing-informe-de-dominio-XXXX.vercel.app`.
3. Visitala. Deberías ver la landing funcionando.

---

## Paso 4 · Ajustar `NEXT_PUBLIC_BASE_URL`

Ahora que ya conocés el dominio:

1. **Project Settings → Environment Variables**.
2. Editá `NEXT_PUBLIC_BASE_URL` con la URL real (sin `/` final).
3. **Redeploy**: pestaña Deployments → al último → ⋯ → **"Redeploy"**.

Esto hace que `back_urls` de MercadoPago, sitemap y Open Graph apunten bien.

---

## Paso 5 · (Opcional) Dominio propio

Si comprás un `.com.ar` o `.com`:

1. **Project Settings → Domains** → Add → escribí tu dominio.
2. Vercel te pide configurar registros DNS (`A` y/o `CNAME`).
3. Una vez verificado, actualizá `NEXT_PUBLIC_BASE_URL` con tu dominio.

---

## Paso 6 · Webhook MercadoPago (sólo si activaste MP)

1. Entrá a <https://www.mercadopago.com.ar/developers/panel/webhooks>.
2. Configurar notificaciones → URL de producción:
   ```
   https://TU-DOMINIO/api/webhook/mercadopago
   ```
3. Eventos: `payment`.
4. Probá un pago de prueba ($100 en sandbox primero).

---

## ✅ Verificación post-deploy

Andá a tu URL y chequeá:

- [ ] La landing carga sin errores (Home).
- [ ] `/servicios` muestra los 18 servicios.
- [ ] `/ejemplos` muestra los 4 mockups con watermark "EJEMPLO".
- [ ] `/terminos`, `/privacidad`, `/arrepentimiento` cargan.
- [ ] El formulario valida campos (patente, email, teléfono).
- [ ] El modal de checkout abre con tabs (Transferencia/QR/MP/Tarjeta).
- [ ] El botón de WhatsApp flotante abre WA con el número correcto.
- [ ] `https://TU-DOMINIO/sitemap.xml` devuelve XML.
- [ ] `https://TU-DOMINIO/robots.txt` devuelve OK.

Si algo falla:
- **Vercel → Deployments → último → "Functions"** muestra los logs de las API.
- **Vercel → Logs (Runtime)** te muestra errores del servidor.

---

## Auto-deploys

A partir de ahora, **cada `git push` a `main` hace un deploy automático**.
Cada PR genera un Preview Deployment con su propia URL.
