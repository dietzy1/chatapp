-- name: AddUserToChatroom :exec
INSERT INTO
    chatroom_users (chatroom_id, user_id)
VALUES
    ($1, $2);

-- name: GetChatrooms :many
SELECT
    c.chatroom_id,
    c.chatroom_name,
    c.owner_id,
    c.icon_src
FROM
    chatrooms c
    JOIN chatroom_users cu ON c.chatroom_id = cu.chatroom_id
WHERE
    cu.user_id = $1;

-- name: GetChannels :many
SELECT
    ch.channel_id,
    ch.channel_name,
    ch.chatroom_id
FROM
    channels ch
    JOIN chatrooms c ON ch.chatroom_id = c.chatroom_id
    JOIN chatroom_users cu ON c.chatroom_id = cu.chatroom_id
WHERE
    cu.user_id = $1;

-- name: GetUsersInChatroom :many
SELECT
    u.user_id,
    u.username,
    u.icon_src,
    u.user_description,
    u.join_date,
    u.verified
FROM
    users u
    INNER JOIN chatroom_users cu ON u.user_id = cu.user_id
WHERE
    cu.chatroom_id = $1;

-- name: GetPrimaryChatroom :one
SELECT
    chatroom_id
FROM
    chatrooms
ORDER BY
    chatroom_id
LIMIT
    1;

-- name: InsertChatroom :one
INSERT INTO
    chatrooms (chatroom_name, icon_src, owner_id)
VALUES
    ($1, $2, $3)
RETURNING
    chatroom_id;

-- name: InsertChannel :exec
INSERT INTO
    channels (channel_name, chatroom_id)
VALUES
    ($1, $2);

-- name: InsertChatroomUser :exec
INSERT INTO
    chatroom_users (chatroom_id, user_id)
VALUES
    ($1, $2);