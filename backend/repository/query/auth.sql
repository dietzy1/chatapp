-- name: GetSessionToken :one
SELECT
    user_id,
    session_token
FROM
    credentials
WHERE
    session_token = $1;