-- =============================================================================
--  Seed the admin login.
--  Run this in Supabase → SQL Editor (the `admins` table must already exist —
--  i.e. run schema.sql first, or at least the admins table portion of it).
--
--  Credentials created by this file:
--      username: admin
--      password: Pass123!
--
--  ⚠️  This is a weak demo password and its hash is committed to the repo.
--      Change it before going live:  npm run hash-password -- 'new-password'
--      then replace the hash below and re-run.
-- =============================================================================
insert into public.admins (email, password_hash)
values (
  'admin',
  'a7d1c7cf6a4c9871eb4c9342950a4eb6:104b75ed60a3ce5175801bee692d6d3b1bd56ef399c20b3964c9ed4009dbdb4743e2eaacf81db1e0711716bf313bfcb432fde914bbe63ca2bebee830fe44c10d'
)
on conflict (email) do update set password_hash = excluded.password_hash;
