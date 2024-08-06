-- noinspection SqlNoDataSourceInspectionForFile

create table if not exists Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author varchar(100),
    title varchar(100),
    year int
);

create table if not exists Rated_Books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author varchar(100),
    title varchar(100),
    year int,
    genre varchar(100)
);
