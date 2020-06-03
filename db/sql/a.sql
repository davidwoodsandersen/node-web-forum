-- Give API permission to access the DB:
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%';

-- Create DB schema:
CREATE TABLE IF NOT EXISTS user (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username varchar(30) NOT NULL UNIQUE,
	password varchar(60) NOT NULL
);
