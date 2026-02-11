-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS role_permissions(
    id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
-- +goose StatementEnd
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions; -- assuming role 1 is admin and it has all permissions

INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, id FROM permissions where name IN ('user;read');
-- +goose Down
-- +goose StatementBegin
DELETE TABLE IF EXISTS role_permissions;
-- +goose StatementEnd
