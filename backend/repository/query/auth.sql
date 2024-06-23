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
