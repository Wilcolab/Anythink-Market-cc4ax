package me.val.dbdemo;

import java.util.List;

import static java.util.Optional.of;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Stream.concat;

public class CompositeBookRepository implements BookRepository {
    private final BooksDao booksDao;
    private final RatedBooksDao ratedBooksDao;

    public CompositeBookRepository(BooksDao booksDao, RatedBooksDao ratedBooksDao) {
        this.booksDao = booksDao;
        this.ratedBooksDao = ratedBooksDao;
    }

    @Override
    public int insertBook(Book book) {
        return of(insertLegacyBook(book))
                .filter(legacyCount -> legacyCount.equals(insertNewBook(book)))
                .orElse(0);
    }

    @Override
    public List<Book> getBooks() {
        var oldBooks = booksDao.listBooks();
        var newBooks = ratedBooksDao.listBooks();

        return concat(oldBooks.stream(), newBooks.stream())
                .collect(toList());
    }


    private int insertNewBook(Book book) {
        return ratedBooksDao.insert(book.getAuthor(), book.getTitle(), book.getYear(), book.getGenre());
    }

    private int insertLegacyBook(Book book) {
        return booksDao.insert(book.getAuthor(), book.getTitle(), book.getYear());
    }
}
