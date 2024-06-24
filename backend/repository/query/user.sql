-- name: CreateUser :one
INSERT INTO
    users (username, icon_src)
VALUES
    ($1, $2)
RETURNING
    user_id;

-- name: GetUser :one
SELECT
    user_id,
    username,
    icon_src,
    user_description,
    join_date,
    verified
FROM
    users
WHERE
    user_id = $1;

-- name: UpdateUserVerification :exec
UPDATE users
    SET verified = true
WHERE user_id = $1;

-- name: UpdateHashedPassword :exec
UPDATE credentials
    SET hash_password = $2
WHERE user_id = $1;

