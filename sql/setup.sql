-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users;
DROP TABLE IF EXISTS posts;

CREATE TABLE github_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT,
    avatar TEXT
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO posts (
    title, 
    description
)
VALUES 
('BBQ at Rigby''s!', 'Feel free to bring any dishes you''d like, will update Slack post if we need anything specific'),
('Do you prefer front-end, or back-end?', 'Just curious what y''all are enjoying more, or maybe which architecture you clicked better with.');