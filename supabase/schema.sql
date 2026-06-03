-- =====================================================================
-- Schema Supabase — Informe de Dominio Automotor
-- =====================================================================

create extension if not exists "uuid-ossp";

create table if not exists public.leads (
  id uuid primary key default uuid_generate_v4(),
  order_id text not null unique,
  patente text not null,
  email text not null,
  telefono text,
  cuit text,
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
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_payment_id_idx on public.leads (payment_id);

-- trigger updated_at
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

-- RLS bloqueada para clientes anónimos. El backend usa service_role.
alter table public.leads enable row level security;

-- Política denegando todo a anon/auth (sólo service_role accede)
drop policy if exists "no anon access" on public.leads;
create policy "no anon access" on public.leads
  for all using (false) with check (false);
