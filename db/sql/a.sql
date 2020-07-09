-- Give API permission to access the DB:
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';

-- Create DB schema:
CREATE TABLE IF NOT EXISTS user (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(30) NOT NULL UNIQUE,
	password varchar(60) NOT NULL,
	avatar_id int NOT NULL,

	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS topic (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(60) NOT NULL,
	description varchar(250),

	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS post (
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	topic_id int NOT NULL,
	title varchar(250) NOT NULL,
	created DATETIME DEFAULT CURRENT_TIMESTAMP,
	body text,

	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id),
	FOREIGN KEY (topic_id) REFERENCES topic(id)
);
