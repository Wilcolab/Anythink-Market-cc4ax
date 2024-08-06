package me.val.dbdemo;

import java.util.List;

public class VanillaBookRepository implements BookRepository {
    private final BooksDao booksDao;

    public VanillaBookRepository(BooksDao booksDao) {
        this.booksDao = booksDao;
    }

    @Override
    public int insertBook(Book book) {
        return booksDao.insert(book.getAuthor(), book.getTitle(), book.getYear());
    }

    @Override
    public List<Book> getBooks() {
        return booksDao.listBooks();
    }
}
