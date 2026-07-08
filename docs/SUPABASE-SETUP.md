# Configurar Supabase desde cero

Supabase es la base de datos donde se guardan los pedidos del formulario.
También es de donde el webhook saca los datos para el mensaje automático
post-pago (servicio, nombre, patente, DNI, teléfono, email).

Tiempo: ~10 minutos. Es gratis.

---

## Paso 1 — Crear el proyecto

1. Entrá a <https://supabase.com> → **Start your project** → registrate (con GitHub o email).
2. Click en **New project**.
3. Completá:
   - **Name**: `informes-dominio`
   - **Database Password**: poné una contraseña fuerte y **guardala** (no la vas a necesitar para el sitio, pero sí para administrar).
   - **Region**: elegí **South America (São Paulo)** (la más cercana a Argentina).
4. Click **Create new project**. Esperá ~2 minutos a que termine de crearse.

---

## Paso 2 — Crear la tabla (correr el SQL)

1. En el menú lateral izquierdo, click en **SQL Editor** (ícono `</>`).
2. Click en **+ New query**.
3. Pegá TODO este SQL y click en **Run** (o Ctrl+Enter):

```sql
create extension if not exists "uuid-ossp";

create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  order_id text not null unique,
  service_slug text,
  service_title text,
  nombre text,
  patente text not null,
  dni text,
  email text not null,
  telefono text,
  amount integer not null default 0,
  status text not null default 'pending'
    check (status in ('pending','approved','in_process','rejected','cancelled')),
  payment_method text,
  payment_id text,
  preference_id text,
  source text,
  utm jsonb,
  user_agent text,
  ip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_telefono_idx on public.leads (telefono);
create index if not exists leads_service_slug_idx on public.leads (service_slug);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_payment_id_idx on public.leads (payment_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at
before update on public.leads
for each row execute procedure public.set_updated_at();

alter table public.leads enable row level security;

drop policy if exists "no anon access" on public.leads;
create policy "no anon access" on public.leads
  for all using (false) with check (false);
```

4. Si aparece **"Success. No rows returned"** → ✅ la tabla se creó.
5. (Opcional) En el menú **Table Editor** vas a ver la tabla `leads`.

---

## Paso 3 — Copiar las credenciales

1. En el menú lateral, abajo, click en **Project Settings** (el engranaje).
2. Click en **API** (o **Data API**).
3. Vas a ver:

| Campo en Supabase | Env var que usa el sitio |
|---|---|
| **Project URL** (ej. `https://abcd1234.supabase.co`) | `SUPABASE_URL` **y** `NEXT_PUBLIC_SUPABASE_URL` |
| **service_role** (en "Project API keys", la secreta) ⚠️ | `SUPABASE_SERVICE_ROLE_KEY` |

> ⚠️ **Importante:** copiá la **service_role** (secret), NO la `anon` (public).
> La service_role solo se usa en el servidor. Nunca la pongas en el front.

---

## Paso 4 — Cargar en Vercel

1. Vercel → tu proyecto → Settings → Environment Variables.
2. Cargá (o pegá en el `.env` de import):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   SUPABASE_URL=https://TU-PROYECTO.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (la service_role, larga)
   ```
3. Marcá Production · Preview · Development.
4. **Save** → Deployments → **Redeploy**.

---

## Paso 5 — Verificar

1. Entrá a tu sitio, completá el formulario y llegá hasta "pagar".
2. En Supabase → **Table Editor → leads** → refrescá.
3. Debería aparecer una fila con los datos (nombre, patente, dni, email, etc.)
   y `status = pending`.
4. Cuando el pago se aprueba, esa fila pasa a `status = approved` (vía webhook).

Si aparece la fila → ✅ Supabase está funcionando y el mensaje automático
post-pago va a tener todos los datos.

---

## ¿Y si no configuro Supabase?
El sitio funciona igual (los pagos andan), pero:
- No se guardan los pedidos en base de datos.
- El mensaje automático post-pago tendría solo el servicio + código (no el
  DNI/email/teléfono, que se leen de Supabase).

Por eso, para el flujo completo que pediste, Supabase es necesario.
