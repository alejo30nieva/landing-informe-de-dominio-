# Informe de Dominio Automotor — Córdoba

Landing page de alta conversión + checkout integrado con MercadoPago y
Supabase para el servicio **"Informe de Dominio Automotor"** de
**Gestoría Córdoba (Córdoba, Argentina)**.

WhatsApp oficial: **+54 9 3515 72-4733**

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **TailwindCSS** + paleta institucional (`#0B1F3A`, `#1246D6`, etc.)
- **Framer Motion** para animaciones suaves
- **shadcn/ui** + **Radix UI** primitives
- **React Hook Form** + **Zod** validation
- **Supabase** (Postgres + RLS) — persistencia de leads y pagos
- **MercadoPago Checkout Pro** — pagos con tarjeta, QR, dinero en cuenta
- **Sonner** — toasts modernos
- **Lucide Icons**

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Metadata SEO + JSON-LD + Inter font
│   ├── page.tsx            # Landing principal
│   ├── globals.css
│   ├── robots.ts / sitemap.ts
│   ├── success/page.tsx    # back_url MP — aprobado
│   ├── pending/page.tsx    # back_url MP — pendiente / rechazado
│   └── api/
│       ├── checkout/route.ts          # crea preferencia + persiste lead
│       ├── webhook/mercadopago/route.ts # IPN MP
│       └── lead/route.ts              # captura simple sin pago
├── components/
│   ├── TopBar.tsx
│   ├── Header.tsx
│   ├── Hero.tsx + HeroForm.tsx
│   ├── Benefits.tsx
│   ├── WhatIs.tsx
│   ├── Services.tsx
│   ├── SocialProof.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── CheckoutModal.tsx       # 4 métodos de pago, animado
│   └── ui/                     # button, input, label, checkbox, dialog, accordion
└── lib/
    ├── utils.ts            # cn, formatARS, maskPatente, generateOrderId
    ├── validations.ts      # Zod schemas
    ├── supabase.ts         # service-role client (lazy)
    ├── mercadopago.ts      # Preference / Payment clients
    ├── rateLimit.ts        # rate limit en memoria
    └── notify.ts           # WhatsApp Cloud API + Resend (opcional)
supabase/
└── schema.sql              # tabla leads + RLS + triggers
```

## Setup local

```bash
npm install
cp .env.local.example .env.local   # completar credenciales
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Ver `.env.local.example`. Mínimas para que funcione el checkout:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | URL pública (back_urls de MP, OG, sitemap) |
| `INFORME_PRICE_ARS` / `NEXT_PUBLIC_INFORME_PRICE` | Precio del informe |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Persistencia |
| `MP_ACCESS_TOKEN` | Access token de MercadoPago |
| `BANK_*` | Datos para pago por transferencia |

Si Supabase no está configurado, el flujo de checkout sigue funcionando
(la persistencia se omite en best-effort).

## Supabase

1. Crear proyecto en [supabase.com](https://supabase.com).
2. Ejecutar `supabase/schema.sql` en el SQL Editor.
3. Copiar `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` a `.env.local`.

La tabla `leads` queda con **RLS activada** y deniega acceso anónimo:
sólo el backend (service role) puede leer/escribir.

## MercadoPago

1. Crear app en [mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers/panel).
2. Copiar `MP_ACCESS_TOKEN` a `.env.local`.
3. Configurar el **webhook** apuntando a:
   ```
   https://TU_DOMINIO/api/webhook/mercadopago
   ```
   Eventos: `payment`.

### Flujo de pago

```
Usuario → Formulario → /api/checkout → Supabase (lead pendiente)
                                    → MP Preference
                                    → init_point (redirect)
       ← Webhook MP → /api/webhook/mercadopago → Supabase (status update)
                                                → Email + WhatsApp admin
       ← back_url    → /success (aprobado) | /pending (pendiente|rechazado)
```

Métodos soportados desde el modal:
- **MercadoPago / Tarjeta:** redirect a `init_point` de MP.
- **QR:** mismo flujo MP (el `init_point` muestra QR Mercado Pago en mobile).
- **Transferencia:** muestra alias/CBU/orden + verificación manual por WhatsApp.

## Deploy en Vercel

1. Importar el repo en [vercel.com](https://vercel.com/new).
2. Setear todas las env vars en **Project Settings → Environment Variables**.
3. Deploy. Listo.

Build commands por defecto de Next.js. Edge runtime **no** se usa (las APIs
usan SDK de MercadoPago que requiere Node).

## SEO / Performance

- Inter como font (display swap, variable).
- Metadata + OG + Twitter Cards + JSON-LD `ProfessionalService`.
- `sitemap.xml` y `robots.txt` autogenerados.
- Lazy loading nativo de Next/Image en imágenes externas.
- Headers de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, …).
- Honeypot anti-spam + rate limit por IP en endpoints sensibles.

## Seguridad

- Validación con **Zod** en servidor.
- **Honeypot** invisible en formularios.
- **Rate limit** en memoria (10 req/min en `/api/checkout`).
- Supabase con **RLS** denegando acceso anónimo.
- `SUPABASE_SERVICE_ROLE_KEY` nunca expuesto al cliente.
- Headers `Permissions-Policy`, `Referrer-Policy`.

## Producto y precio

- Precio default: **$6.900 ARS** (configurable por env).
- Tono: institucional, claro, argentino, sin agresividad.
- Visualmente inspirado en DNRPA + UI moderna (MP / Stripe).

---

Hecho con cariño para Gestoría Córdoba.
