-- name: AddUserToCredentials :one
INSERT INTO credentials (user_id, session_token)
VALUES ($1, gen_random_uuid())
RETURNING session_token;