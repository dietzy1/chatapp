DO $$ BEGIN

-- One to many relation with both users and chatrooms
CREATE TABLE IF NOT EXISTS
  icons (
    icon_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    kind VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    is_default BOOLEAN NOT NULL
  );

CREATE TABLE IF NOT EXISTS
  users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    username VARCHAR(255) NOT NULL,
    icon_id UUID REFERENCES icons (icon_id) NOT NULL,
    user_description VARCHAR(255) NOT NULL,
    join_date DATE DEFAULT CURRENT_DATE NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false
  );

CREATE TABLE IF NOT EXISTS
  credentials (
    user_id UUID PRIMARY KEY REFERENCES users (user_id) ON DELETE CASCADE,
    hash_password VARCHAR(255),
    session_token UUID NOT NULL DEFAULT gen_random_uuid ()
  );

CREATE TABLE IF NOT EXISTS
  chatrooms (
    chatroom_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    chatroom_name VARCHAR(255) NOT NULL,
    icon_id UUID NOT NULL REFERENCES icons (icon_id),
    owner_id UUID NOT NULL REFERENCES users (user_id)
  );_

-- One to many relation with chatrooms
CREATE TABLE IF NOT EXISTS
  channels (
    channel_id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    channel_name VARCHAR(255) NOT NULL,
    chatroom_id UUID NOT NULL REFERENCES chatrooms (chatroom_id) ON DELETE CASCADE
  );

-- Junction table for the many to many relation between users and chatrooms
CREATE TABLE IF NOT EXISTS
  chatroom_users (
    chatroom_id UUID NOT NULL REFERENCES chatrooms (chatroom_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    PRIMARY KEY (chatroom_id, user_id)
  );

