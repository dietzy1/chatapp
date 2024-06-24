-- name: GetSessionToken :one
SELECT
    user_id,
    session_token
FROM
    credentials
WHERE
    session_token = $1;

-- name: NullifySessionToken :exec
UPDATE credentials
    SET session_token = ''
WHERE session_token = $1
AND user_id = $2;

-- name: GetHashedPasswordByUsername :one
SELECT 
    c.hash_password,
    c.user_id
    FROM users u
JOIN credentials c ON u.user_id = c.user_id
    WHERE u.username = $1;

-- name: AddSessionToken :exec
UPDATE credentials
    SET session_token = $1
WHERE user_id = $2;