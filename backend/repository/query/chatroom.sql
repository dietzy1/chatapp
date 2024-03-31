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
    CAST(c.icon_id AS UUID) as icon_id,
    CAST(i.kind AS VARCHAR(255)) AS icon_kind,
    CAST(i.link AS VARCHAR(255)) AS icon_link
FROM
    chatrooms c
    JOIN chatroom_users cu ON c.chatroom_id = cu.chatroom_id
    LEFT JOIN icons i ON c.icon_id = i.icon_id
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
    u.icon_id,
    i.link AS icon_link,
    i.kind AS icon_kind,
    u.user_description,
    u.join_date,
    u.verified
FROM
    users u
    LEFT JOIN icons i ON u.icon_id = i.icon_id
    INNER JOIN chatroom_users cu ON u.user_id = cu.user_id
WHERE
    cu.chatroom_id = $1;