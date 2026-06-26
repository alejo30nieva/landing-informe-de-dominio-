# Guardar pedidos en Google Sheets

Cada vez que alguien completa el formulario y va a pagar, los datos se guardan
automáticamente en una hoja de Google Sheets (además de Supabase).

Funciona con un **Google Apps Script** desplegado como Web App. Es gratis y no
necesita credenciales OAuth.

---

## Paso 1 — Crear la hoja

1. Andá a <https://sheets.google.com> y creá una hoja nueva.
2. En la **fila 1** poné estos encabezados (en este orden), una columna cada uno:

```
fecha | orden | servicio | nombre | patente | dni | telefono | email | monto | metodo | estado
```

3. Renombrá la pestaña como `Pedidos` (opcional pero recomendado).

---

## Paso 2 — Crear el Apps Script

1. En la hoja: menú **Extensiones → Apps Script**.
2. Borrá todo el código que aparece y pegá esto:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Pedidos")
                || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.fecha   || new Date(),
      data.orden   || "",
      data.servicio|| "",
      data.nombre  || "",
      data.patente || "",
      data.dni     || "",
      data.telefono|| "",
      data.email   || "",
      data.monto   || "",
      data.metodo  || "",
      data.estado  || "pendiente"
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Guardá (ícono de disquete).

---

## Paso 3 — Desplegar como Web App

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configuración:
   - **Descripción**: `Webhook pedidos`
   - **Ejecutar como**: **Yo** (tu cuenta)
   - **Quién tiene acceso**: **Cualquier usuario** ← importante
4. Click **Implementar**.
5. Autorizá los permisos cuando lo pida (es tu propia cuenta).
6. Copiá la **URL de la aplicación web** (termina en `/exec`).

---

## Paso 4 — Cargar la URL en Vercel

1. Vercel → tu proyecto → Settings → Environment Variables.
2. Agregá:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL = https://script.google.com/macros/s/AKfy.../exec
   ```
3. Marcá Production + Preview + Development.
4. **Redeploy**.

---

## Listo ✅

Desde ahora, cada pedido del formulario agrega una fila a tu hoja con:
fecha, código (SKU), servicio, nombre, patente, DNI, teléfono, email, monto,
método de pago y estado.

> El estado se guarda como "pendiente" al iniciar el pago. El estado "aprobado"
> queda confirmado en Supabase y en MercadoPago (Actividad). Si querés que la
> hoja también marque "aprobado" automáticamente, se puede ampliar el webhook
> más adelante.

### Nota
- Si no configurás `GOOGLE_SHEETS_WEBHOOK_URL`, el sitio funciona igual; solo
  no se escribe en la hoja (los datos siguen yendo a Supabase).
- El guardado en Sheets es "best-effort": si falla, no rompe ni demora el pago.
