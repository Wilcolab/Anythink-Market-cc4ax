package me.val.dbdemo;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertTrue;

public class RatedBooksDaoTest extends DaoTestBase<RatedBooksDao> {

    public RatedBooksDaoTest() {
        super(RatedBooksDao.class, "rated-books-data.xml", "DROP TABLE rated_books;", new RatedBookMapper());
    }

    @Before
    public void setUp() throws Exception {
        setUpBase();
    }

    @After
    public void tearDown() throws Exception {
        tearDownBase();
    }

    @Test
    public void testInsert() {
        dao.insert("Author Test", "New Book", 2021, "potato");
        List<Book> books = dao.listBooks();
        assertTrue("Book should be inserted", books.stream().anyMatch(b -> b.getTitle().equals("New Book")));
    }

    @Test
    public void testUpdate() {
        // Assuming the ID of the inserted book is known or retrieved from the insert operation
        dao.updateTitleById(1, "Updated Book");
        List<Book> books = dao.listBooks();
        assertTrue("Title should be updated", books.stream().anyMatch(b -> b.getTitle().equals("Updated Book")));
    }

    @Test
    public void testDelete() {
        // Assuming the ID of the inserted book is known
        dao.deleteById(1);
        List<Book> books = dao.listBooks();
        assertTrue("Book should be deleted", books.isEmpty());
    }
}