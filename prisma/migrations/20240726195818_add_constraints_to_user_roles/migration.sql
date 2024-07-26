ALTER TABLE "user_roles"
ADD CONSTRAINT "chk_roleName_valid"
CHECK (
  (id = 1 AND "roleName" = 'read') OR
  (id = 2 AND "roleName" = 'read-edit') OR
  (id = 3 AND "roleName" = 'read-edit-delete') OR
  (id = 4 AND "roleName" = 'owner')
);