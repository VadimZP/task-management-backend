ALTER TABLE "users" DROP CONSTRAINT email_format;

ALTER TABLE "users"
ADD CONSTRAINT email_format
CHECK (email ~* '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$');

