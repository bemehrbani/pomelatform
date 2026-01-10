-- Create daily_updates table
create table public.daily_updates (
  id uuid not null default gen_random_uuid (),
  project_id text null, -- optional, if not cross-project
  summary text not null,
  raw_data jsonb null,
  date date not null default CURRENT_DATE,
  created_at timestamp with time zone not null default now(),
  constraint daily_updates_pkey primary key (id)
);

-- Enable RLS
alter table public.daily_updates enable row level security;

-- Create policy to allow read access for authenticated users
create policy "Enable read access for authenticated users" on public.daily_updates
  for select using (auth.role() = 'authenticated');

-- Create policy to allow insert access for service role (n8n)
-- Note: Service role has admin privileges by default, but good to be explicit if using simpler auth
create policy "Enable insert for service role" on public.daily_updates
  for insert with check (true);
