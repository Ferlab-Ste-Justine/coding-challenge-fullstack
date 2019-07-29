# create table wall_user

# --- !Ups

CREATE TABLE wall_user (
  id BIGINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(25) NOT NULL,
  message VARCHAR(500) NULL default 'New member',
  PRIMARY KEY (id),
  UNIQUE INDEX username_unique (username ASC)
);

INSERT INTO wall_user(id, username, password, role) values (1, 'member', '098F6BCD4621D373CADE4E832627B4F6', 'member')

# --- !Downs

DROP TABLE wall_user;