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

-- PROJECTS TABLE
create table public.projects (
  id uuid not null default uuid_generate_v4() primary key,
  title text not null,
  description text,
  status text not null default 'Active',
  owner_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint status_check check (status in ('Active', 'On Hold', 'Completed'))
);

-- RLS POLICIES
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;
alter table public.projects enable row level security;

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

-- User Roles: Public read
create policy "User roles are viewable by everyone."
  on public.user_roles for select
  using ( true );

-- Projects: All auth users can view, Only Partner/Founder can create
create policy "Projects are viewable by everyone."
  on public.projects for select
  using ( true );

create policy "Partners and Founders can create projects."
  on public.projects for insert
  with check (
    exists (
      select 1 from public.user_roles ur
      join public.roles r on ur.role_id = r.id
      where ur.user_id = auth.uid()
      and r.name in ('Partner', 'Founder')
    )
  );

create policy "Partners and Founders can update projects."
  on public.projects for update
  using (
    exists (
      select 1 from public.user_roles ur
      join public.roles r on ur.role_id = r.id
      where ur.user_id = auth.uid()
      and r.name in ('Partner', 'Founder')
    )
  );

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

-- PROJECT MEMBERS TABLE
create table public.project_members (
  id uuid not null default uuid_generate_v4() primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'Member',
  equity_percent numeric default 0,
  payment_terms text,
  is_agreement_signed boolean default false,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(project_id, user_id)
);

-- RLS for Project Members
alter table public.project_members enable row level security;

-- Everyone can view project members (Transparency)
create policy "Project members are viewable by everyone."
  on public.project_members for select
  using ( true );

-- Only Partners, Founders, or Project Owner can manage members
create policy "Manage project members."
  on public.project_members for all
  using (
    exists (
      select 1 from public.user_roles ur
      join public.roles r on ur.role_id = r.id
      where ur.user_id = auth.uid()
      and r.name in ('Partner', 'Founder')
    )
    or
    exists (
      select 1 from public.projects p
      where p.id = project_members.project_id
      and p.owner_id = auth.uid()
    )
  );

