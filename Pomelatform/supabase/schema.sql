-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ROLES TABLE
create table public.roles (
  id uuid not null default uuid_generate_v4() primary key,
  name text not null unique
);

-- Seed Roles
insert into public.roles (name) values
  ('Partner'),
  ('Founder'),
  ('Developer'),
  ('Investor'),
  ('Intern'),
  ('Designer'),
  ('Domain Expert')
on conflict (name) do nothing;

-- PROFILES TABLE (Extends auth.users)
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- USER_ROLES JOIN TABLE (Many-to-Many)
create table public.user_roles (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  unique (user_id, role_id)
);

-- RLS POLICIES
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;

-- Profiles: Public read, User update own
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- Roles: Public read only
create policy "Roles are viewable by everyone."
  on public.roles for select
  using ( true );

-- User Roles: Public read, Admins/Self manage (simplified for now: users can read their roles)
create policy "User roles are viewable by everyone."
  on public.user_roles for select
  using ( true );

-- Trigger for Profile creation on Auth Sign Up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
