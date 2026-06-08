# Pricing, comisiones de Mercado Pago y comparativa

Este documento es la **guía de decisión de precios**. Configurá los valores
finales en `.env` (o en el catálogo `src/lib/services.ts`).

---

## 1. Precios actuales del catálogo

| Servicio | Precio sugerido (ARS) | Slug |
|---|---:|---|
| Informe de Dominio | **$9.900** | `informe-dominio` |
| Informe Histórico de Titulares | **$13.900** | `informe-historico-titulares` |
| Informe Nominal | **$10.500** | `informe-nominal` |
| Informe de Multas (Nacional) | **$17.200** | `informe-multas` |
| Informe de Multas EXPRESS | **$22.600** | `informe-multas-express` |
| Combo Compra Segura (Dominio + Histórico + Multas) | **$34.900** | `informe-compra-segura` |
| Valuación Fiscal | $4.900 | `valuacion-fiscal` |

Los demás trámites (transferencias, denuncia de venta, cédula azul, etc.) se
cotizan a medida por WhatsApp.

---

## 2. Comisiones de Mercado Pago (Argentina · valores referenciales)

> Verificá los porcentajes vigentes en
> [mercadopago.com.ar/costs](https://www.mercadopago.com.ar/costs) — cambian
> periódicamente.

| Medio | Comisión típica | Acreditación | IVA |
|---|---:|---|---|
| **Dinero en cuenta MP** (CVU del cliente) | ~0% | Instantáneo | — |
| **Transferencia bancaria / CVU** | **0%** | Instantáneo / 24 hs | — |
| **QR interoperable** (a tu CVU MP) | **0%** | Instantáneo | — |
| Tarjeta de débito | ~2,99% | Instantáneo | +21% |
| Tarjeta de crédito al instante | ~6,29% | Instantáneo | +21% |
| Tarjeta de crédito a 14 días | ~3,99% | 14 días | +21% |
| Tarjeta de crédito a 30 días | ~3,49% | 30 días | +21% |
| Rapipago / Pago Fácil | ~3,99% + fijo | 2-5 días | +21% |

### Cuánto te queda neto (estimado)

Para un Informe Histórico a **$13.900**:

| Medio | Comisión | Te queda |
|---|---:|---:|
| **Transferencia / QR / CVU** | $0 | **$13.900** |
| Débito | ~$502 (2,99% + IVA) | ~$13.398 |
| Crédito al instante | ~$1.058 (6,29% + IVA) | ~$12.842 |
| Crédito 30 días | ~$586 (3,49% + IVA) | ~$13.314 |

Por eso el checkout posiciona **Transferencia y QR como "Recomendado"** —
se llevan el 100% del cobro.

---

## 3. Comparativa con competencia

Datos relevados en mercado argentino (referencial, varían por proveedor).

| Proveedor | Informe Dominio | Histórico | Multas Nacional |
|---|---:|---:|---:|
| **Nuestra propuesta** | **$9.900** | **$13.900** | **$17.200** |
| informe.com.ar | ~$14.900 | ~$16.900 | n/d |
| infoauto-argentina.com | ~$11.500 | ~$15.500 | ~$18.900 |
| Mandataria física presencial | ~$8.000 – $12.000 | ~$10.000 – $15.000 | ~$15.000 – $20.000 |

Posicionamiento: nos colocamos **20–30% por debajo de los principales
agregadores** manteniendo margen sano. Si el volumen baja, conviene subir el
informe de dominio a $11.900 (sigue siendo competitivo).

---

## 4. Cómo cobrar más con la misma calidad percibida

- **Combo "Compra Segura"** con descuento (ya armado a $34.900 vs $41.000 por
  separado): aumenta el ticket promedio.
- **EXPRESS con prioridad**: el cliente paga 30% más por velocidad, sin
  costo operativo extra para vos (sólo prioridad en la cola).
- **Anclaje visual**: mostrar siempre el precio del Informe Multas EXPRESS
  hace que los otros parezcan baratos.

---

## 5. Configuración técnica

Los precios viven en `src/lib/services.ts` (`priceARS`). Para cambiarlos:

```ts
{
  slug: "informe-dominio",
  priceARS: 9900,   // ← cambiar acá
  ...
}
```

El precio del informe que se cobra desde el formulario principal del Hero
está en envs:

```
NEXT_PUBLIC_INFORME_PRICE=9900
INFORME_PRICE_ARS=9900
```

Cambiá ambos para que coincida lo que se muestra y lo que se cobra.

---

## 6. Estrategia de cobro para producción

1. **Cuenta de MP** profesional vinculada al CUIT de la empresa.
2. **Alias y CVU** dedicados (no usar tu cuenta personal).
3. **Modo principal: transferencia/QR** (0% comisión, dinero al toque).
4. **MercadoPago Checkout Pro** como fallback (comodidad para el cliente).
5. Una vez recibido el comprobante por WhatsApp, **chequear** en la app de
   MP que el monto coincida exactamente con el N° de orden.
6. **Procesar el informe** y enviarlo por email + WhatsApp.

Tiempo objetivo total: **10–15 minutos** desde el pago.
