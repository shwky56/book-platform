-- Active: 1681165761411@@localhost@3336@BOOK

-- User Table
CREATE TABLE User (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  type ENUM('reader', 'admin') NOT NULL DEFAULT 'reader',
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

--  Book Tabel
CREATE TABLE Book (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  author VARCHAR(255) NOT NULL,
  field VARCHAR(255),
  publication_date DATE NOT NULL,
  pdf_file VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- create table named Request The purpose of this 
-- table is to create a many to many relationhp between two tables User and Book

CREATE TABLE Request (
  id INT NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL,
  user_id INT NOT NULL,
  status ENUM('pending', 'accept', 'not-accept') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY `unique_request` (book_id, user_id),
  FOREIGN KEY (book_id) REFERENCES Book(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);
-- add default order in column updated_at
ALTER TABLE `Request` ORDER BY updated_at DESC;


--  Chapter Table
CREATE TABLE Chapter (
  id INT NOT NULL AUTO_INCREMENT,
  book_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (book_id) REFERENCES Book(id)
);

-- search history table 
CREATE TABLE search_history (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);


ALTER TABLE Book
ADD COLUMN poster VARCHAR(255);

RENAME TABLE search_history TO Search;

--  add phone column for table user
ALTER TABLE User
ADD COLUMN phone VARCHAR(255);
    