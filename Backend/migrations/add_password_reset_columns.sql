-- Agregar columnas para recuperación de contraseña a la tabla usuario
-- Ejecuta esto en MySQL si aún no existen estas columnas

ALTER TABLE usuario ADD COLUMN reset_token VARCHAR(255) NULL;
ALTER TABLE usuario ADD COLUMN reset_token_expiry DATETIME NULL;

-- Crear índice para búsquedas rápidas por token
CREATE INDEX idx_reset_token ON usuario(reset_token);
