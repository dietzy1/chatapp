-- name: CreateUser :exec
INSERT INTO
  users (user_id, username, icon_id, join_date, verified)
VALUES
  ($1, $2, $3, $4, $5);