# Integración con Mercado Pago — Checkout Pro

Guía completa para dejar funcionando el cobro con tarjeta + dinero en cuenta
de MP usando la integración que ya está armada en este repo.

> **Repo**: `src/lib/mercadopago.ts`, `src/app/api/checkout/route.ts`,
> `src/app/api/webhook/mercadopago/route.ts`.

---

## TL;DR

```
1) Crear app en MP Developers          → 2 min
2) Copiar Access Token (TEST primero)  → 1 min
3) Pegar en Vercel: MP_ACCESS_TOKEN    → 1 min
4) Configurar Webhook + Secret en MP   → 2 min
5) Verificar /api/health/mp            → 30 seg
6) Pago de prueba con tarjeta test     → 1 min
7) Pasar a producción (APP_USR-...)    → 1 min
```

Total: ~10 minutos.

---

## Paso 1 — Crear la aplicación en MP Developers

1. Entrá a <https://www.mercadopago.com.ar/developers/panel/app>.
2. Click en **"Crear aplicación"**.
3. Datos:
   - **Nombre**: `Gestoría Córdoba — Informes`.
   - **Modelo de integración**: "No, estoy creando un producto desde cero".
   - **Producto que usás**: **Checkout Pro**.
   - **¿Tu solución integra pagos?**: Sí.
4. Aceptar y crear.

---

## Paso 2 — Obtener Access Token

Una vez creada la app, vas al detalle y entrás a **Credenciales**.

Hay 2 sets:

| | Access Token | Public Key |
|---|---|---|
| **Test** (Sandbox) | `TEST-1234567890abcdef...` | `TEST-1a2b3c...` |
| **Producción** | `APP_USR-1234567890...` | `APP_USR-1a2b3c...` |

**Empezá siempre con TEST.** Probás todo, y cuando funcione pasás a producción
cambiando una sola variable.

---

## Paso 3 — Configurar en Vercel

En **Vercel → Project Settings → Environment Variables**:

| Variable | Valor | Notas |
|---|---|---|
| `MP_ACCESS_TOKEN` | `TEST-xxx...` (o `APP_USR-...` en prod) | Server-only |
| `NEXT_PUBLIC_BASE_URL` | `https://tu-dominio.vercel.app` | URL real del deploy |
| `MP_WEBHOOK_SECRET` | (se obtiene en paso 4) | Opcional pero recomendado |
| `MP_HEALTH_KEY` | cualquier string (ej `chk_2026`) | Opcional, protege /api/health/mp |

Aplicá a **Production, Preview y Development**.

Después: **Deployments → último → ⋯ → Redeploy** para que tome las envs.

---

## Paso 4 — Configurar el Webhook

1. Entrá a **MP Developers → tu app → Webhooks → Configurar notificaciones**.
2. **Modo**: Producción (cuando ya estés con `APP_USR-...`) o Test (con TEST).
3. **URL**:
   ```
   https://TU-DOMINIO.vercel.app/api/webhook/mercadopago
   ```
4. **Eventos**: marcá **`payment`** (alta y actualización).
5. Guardar.
6. MP te da una **"Clave secreta"** → copiala y pegala en Vercel como
   `MP_WEBHOOK_SECRET`. Redeploy.

> Nuestro webhook valida la firma HMAC SHA-256 que MP firma según el manifest:
> `id:<data.id>;request-id:<x-request-id>;ts:<ts>;` (ver
> `src/app/api/webhook/mercadopago/route.ts` línea `verifyMpSignature`).

---

## Paso 5 — Verificar credenciales con /api/health/mp

Con el deploy listo, abrí en el browser (o con curl):

```
https://TU-DOMINIO.vercel.app/api/health/mp?key=<MP_HEALTH_KEY>
```

Si todo está bien devuelve:

```json
{
  "ok": true,
  "checks": {
    "mpConfigured": true,
    "testMode": true,
    "publicBaseUrl": "https://tu-dominio.vercel.app",
    "webhookSignatureSecretSet": true,
    "supabaseSet": true,
    "preferenceCreated": true,
    "preferenceId": "1234567890-abc",
    "initPoint": "https://www.mercadopago.com.ar/checkout/...",
    "sandboxInitPoint": "https://sandbox.mercadopago.com.ar/checkout/..."
  }
}
```

Si falla:
- `mpConfigured: false` → falta `MP_ACCESS_TOKEN` en Vercel.
- `preferenceCreated: false` con error → el token está mal copiado o expiró.

---

## Paso 6 — Pago de prueba (Test Mode)

Necesitás un **usuario de prueba** de MP (no podés pagar con tu cuenta real
en sandbox).

### Crear usuarios de test

1. Entrá a <https://www.mercadopago.com.ar/developers/panel/test-users>.
2. Creá **dos usuarios** (uno vendedor, uno comprador).
3. El **vendedor**: tomá su `Access Token` y poné ese en `MP_ACCESS_TOKEN` (esto
   te permite simular cobros).
4. El **comprador**: anotá su `email` y `password` para loguearte al pagar.

### Tarjetas de prueba (Argentina)

| Banca | Número | CVV | Vencimiento | Resultado |
|---|---|---|---|---|
| Mastercard | `5031 7557 3453 0604` | 123 | 11/30 | **APRO** (Aprobado) |
| Visa | `4509 9535 6623 3704` | 123 | 11/30 | **APRO** (Aprobado) |
| Amex | `3711 803032 57522` | 1234 | 11/30 | **APRO** (Aprobado) |
| Mastercard | `5031 7557 3453 0604` | 123 | 11/30 | Cambiá el **Nombre del Titular** a uno de:|
| | | | | `APRO` (aprobado), `CONT` (pendiente), `OTHE` (rechazado), `CALL` (rechazado validación), `FUND` (rechazado sin fondos), `SECU` (rechazado código), `EXPI` (rechazado fecha), `FORM` (rechazado error datos) |

DNI a usar: `12345678` siempre.

### Hacer el pago

1. Andá a tu landing en producción.
2. Llená el form, elegí "MercadoPago" o "Tarjeta", "Solicitar".
3. Vas a ser redirigido al checkout de MP **en sandbox**.
4. Pagá con la tarjeta de test (titular `APRO`).
5. Volvés a `/success?order=IDA-XXX`.
6. En MP → tu app → **Operaciones** vas a ver el pago.
7. En `/api/webhook/mercadopago` llega el evento → tu DB se actualiza →
   se manda el email y el WhatsApp.

---

## Paso 7 — Pasar a producción

Cuando todo funcione en TEST, hacé:

1. **Vercel** → cambiar `MP_ACCESS_TOKEN` de `TEST-...` por `APP_USR-...`.
2. **MP Webhooks** → cambiar la URL del modo **Test** al modo **Producción**
   (misma URL, mismo secret).
3. Redeploy.
4. Probá con **tu propia tarjeta** una vez ($10 ARS para tener la
   confirmación del flujo completo).

✅ Listo.

---

## Configuración avanzada

### Excluir métodos de pago

En `src/app/api/checkout/route.ts`:

```ts
payment_methods: {
  excluded_payment_types: [
    { id: "ticket" },   // sin Rapipago/PagoFácil
    { id: "atm" },      // sin cajero
  ],
  installments: 12,     // máx. cuotas
}
```

Tipos disponibles: `credit_card`, `debit_card`, `ticket`, `atm`, `bank_transfer`,
`account_money`, `digital_currency`.

### Cobrar más o menos por cuotas

Las cuotas las paga el comprador. Si no querés que se vean:

```ts
payment_methods: {
  installments: 1, // sólo un pago
}
```

### Ver pagos en MP

<https://www.mercadopago.com.ar/activities>

---

## Flujo completo (qué pasa cuando alguien paga)

```
1) Cliente llena form en /  →  POST /api/checkout
                              ├─ Valida con Zod
                              ├─ Inserta lead en Supabase (status=pending)
                              ├─ Crea preference en MP (idempotency=orderId)
                              └─ Devuelve init_point al cliente

2) Cliente redirige a MP   →  Paga
                              MP confirma el pago

3) MP llama nuestro webhook → POST /api/webhook/mercadopago
                              ├─ Valida firma HMAC (x-signature)
                              ├─ Consulta el pago a MP por id
                              ├─ Update Supabase (status=approved, payment_id)
                              ├─ Idempotency: si ya estaba approved no re-notifica
                              └─ Si es nuevo:
                                  ├─ Email al cliente
                                  └─ WhatsApp al admin

4) MP redirige al cliente → /success?order=IDA-XXX
```

---

## Troubleshooting

### "MercadoPago aún no está configurado"

Vercel no tiene la env `MP_ACCESS_TOKEN`. Andá a Settings → Environment
Variables y agregala.

### El webhook llega 401

La firma HMAC no coincide. Verificá que `MP_WEBHOOK_SECRET` en Vercel es
**exactamente** la clave que te dio MP (cuidado con espacios al copiar).

### El cliente paga pero no llega el email

Revisá `Vercel → Logs (Runtime)` durante la última hora. Buscá
`[mp-webhook]`. Si ves "supabase update fallido" → revisar credenciales SUPABASE.
Si ves "Resend" → falta `RESEND_API_KEY`.

### Test funciona pero producción no

Probablemente cambiaste a `APP_USR-...` pero el webhook en MP sigue en modo
**Test**. Andá a Webhooks → modo Producción.

---

## Referencias

- **Checkout Pro Docs**: <https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/landing>
- **Webhooks**: <https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks>
- **Validar firma**: <https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks#editor_4>
- **Tarjetas test**: <https://www.mercadopago.com.ar/developers/es/docs/checkout-api/integration-test/test-cards>
- **Usuarios de prueba**: <https://www.mercadopago.com.ar/developers/panel/test-users>
