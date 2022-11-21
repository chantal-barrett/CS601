-- create the tables
CREATE TABLE messages (
  messageID       INT(11)        NOT NULL AUTO_INCREMENT,
  contactName     VARCHAR(255)   NOT NULL,
  email           VARCHAR(255)   NOT NULL,
  messageContent  VARCHAR(255)   NOT NULL,
  PRIMARY KEY (messageID)
);

-- insert data into the database
INSERT INTO messages VALUES
(1, 'Chantal Barrett', 'chantalb@bu.edu', 'hi');
