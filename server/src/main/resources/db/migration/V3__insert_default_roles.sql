INSERT INTO roles (role_name, role_description)
VALUES
  ('ADMIN', 'Administrator role with full permissions'),
  ('USER', 'Standard user role with limited permissions')
ON CONFLICT (role_name) DO NOTHING;
