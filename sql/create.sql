CREATE TABLE account (
    account_id                          BIGSERIAL      PRIMARY KEY,
    display_name                        TEXT           NOT NULL UNIQUE,
    hashed_password                     TEXT           NOT NULL,
    created_at                          TIMESTAMPTZ    DEFAULT NOW()
);