CREATE TABLE applications (
  application_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  certificate_uuid UUID NOT NULL,
  created_user_id UUID references auth.users NOT NULL,
  UNIQUE (name, address)
);

alter table applications enable row level security;

create policy "Can view own applications data." 
on public.applications 
for select 
using (auth.uid() = created_user_id);

CREATE POLICY "insert only if logged in"
ON public.applications
FOR INSERT 
TO authenticated 
WITH CHECK (true);