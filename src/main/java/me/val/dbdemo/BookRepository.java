package me.val.dbdemo;

import java.util.List;

interface BookRepository {
    int insertBook(Book book);

    List<Book> getBooks();
}
