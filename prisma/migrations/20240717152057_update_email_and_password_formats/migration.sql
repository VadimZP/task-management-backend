ALTER TABLE "users" DROP CONSTRAINT email_format;

ALTER TABLE "users"
ADD CONSTRAINT email_format
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');

ALTER TABLE "users" DROP CONSTRAINT password_format;

ALTER TABLE "users"
ADD CONSTRAINT password_format CHECK (char_length(password) > 8 AND char_length(password) < 32 AND password ~ '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$');




