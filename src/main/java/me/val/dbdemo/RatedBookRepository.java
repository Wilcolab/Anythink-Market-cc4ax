package me.val.dbdemo;

import java.util.List;

public class RatedBookRepository implements BookRepository {
    private final RatedBooksDao ratedBooksDao;

    public RatedBookRepository(RatedBooksDao ratedBooksDao) {
        this.ratedBooksDao = ratedBooksDao;
    }

    @Override
    public int insertBook(Book book) {
        return ratedBooksDao.insert(book.getAuthor(), book.getTitle(), book.getYear(), book.getGenre());
    }

    @Override
    public List<Book> getBooks() {
        return ratedBooksDao.listBooks();
    }
}
