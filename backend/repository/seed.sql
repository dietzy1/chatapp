DO $$
DECLARE
    new_user_id UUID;
    new_chatroom_id UUID;
BEGIN
    -- Check if the users table is empty and insert data if it is, returning the user_id
    IF NOT EXISTS (SELECT 1 FROM users) THEN
        INSERT INTO users (username, icon_src, user_description, verified)
        VALUES ('God admin Bob', 'https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036', 'Admin', false)
        RETURNING user_id INTO new_user_id;
    END IF;

    -- Check if the chatrooms table is empty and insert data if it is, using the new_user_id as owner_id, returning chatroom_id
    IF NOT EXISTS (SELECT 1 FROM chatrooms) THEN
        INSERT INTO chatrooms (chatroom_name, icon_src, owner_id)
        VALUES ('Javascript haters', 'https://emojiisland.com/cdn/shop/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036', new_user_id)
        RETURNING chatroom_id INTO new_chatroom_id;
    END IF;

    -- Check if the channels table is empty and insert data if it is, using the new_chatroom_id
    IF NOT EXISTS (SELECT 1 FROM channels) THEN
        INSERT INTO channels (channel_name, chatroom_id)
        VALUES ('Main', new_chatroom_id);
    END IF;

    -- Check if the chatroom_users table is empty and insert data if it is, using the new_chatroom_id and new_user_id
    IF NOT EXISTS (SELECT 1 FROM chatroom_users) THEN
        INSERT INTO chatroom_users (chatroom_id, user_id)
        VALUES (new_chatroom_id, new_user_id);
    END IF;

    -- Check if the credentials table is empty and insert data if it is
    IF NOT EXISTS (SELECT 1 FROM credentials) THEN
        INSERT INTO credentials (user_id, session_token)
        VALUES (new_user_id, gen_random_uuid());
    END IF;
END $$;