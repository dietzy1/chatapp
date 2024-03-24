-- name: CreateIcon :exec
INSERT INTO
    icons (icon_id, link, kind)
VALUES
    ($1, $2, $3);