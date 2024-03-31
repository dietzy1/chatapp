-- name: GetRandomDefaultIcon :one
SELECT *
FROM icons
WHERE is_default = true
ORDER BY RANDOM()
LIMIT 1;