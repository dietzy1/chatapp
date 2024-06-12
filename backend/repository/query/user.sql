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