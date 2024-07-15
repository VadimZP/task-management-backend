-- Add CHECK constraint for nickname length
ALTER TABLE "users"
ADD CONSTRAINT nickname_length CHECK (char_length(nickname) > 3 AND char_length(nickname) < 16);

-- Add CHECK constraint for password
ALTER TABLE "users"
ADD CONSTRAINT password_format CHECK (char_length(password) > 8 AND char_length(password) < 32 AND password ~ '^[A-Za-z0-9]+$');
