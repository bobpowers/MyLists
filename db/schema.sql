DROP DATABASE IF EXISTS lists_db;
CREATE database lists_db;
USE lists_db;

CREATE table list (
    item_id INT(11) NOT NULL AUTO_INCREMENT,
    list_title varchar(40) NOT NULL,
    listed_item varchar(100) NOT NULL,
    task_active BOOLEAN DEFAULT TRUE,
    user_id INT(11) NOT NULL,
    date TIMESTAMP,
    PRIMARY KEY (item_id)
);

CREATE table users (
	id INT(11) NOT NULL AUTO_INCREMENT,
	email varchar(50) NOT NULL,
	PRIMARY KEY (id)
);