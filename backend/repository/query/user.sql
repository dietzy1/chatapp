-- name: CreateUser :one
INSERT INTO
    users (username, user_description, icon_id)
VALUES
    ($1, $2, $3)
RETURNING
    user_id;

-- name: GetUserAndIcon :one
SELECT
    u.user_id,
    u.username,
    CAST(i.icon_id AS UUID) AS icon_id,
    i.link,
    i.kind,
    i.is_default,
    u.user_description,
    u.join_date,
    u.verified
FROM
    users u
    LEFT JOIN icons i ON u.icon_id = i.icon_id
WHERE
    u.user_id = $1;