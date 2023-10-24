INSERT INTO storage.buckets
  (id, name)
VALUES
  ('certificates', 'certificates');

  create policy "Authenticated users can select"
  on storage.objects for select
  using ( bucket_id = 'certificates' AND auth.role() = 'authenticated' );

  create policy "Authenticated users can insert"
  on storage.objects for insert
  with check ( bucket_id = 'certificates' AND auth.role() = 'authenticated' );

create policy "Authenticated users can update"
  on storage.objects for update
  with check ( bucket_id = 'certificates' AND auth.role() = 'authenticated' );