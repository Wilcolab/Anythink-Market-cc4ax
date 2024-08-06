package me.val.dbdemo;


import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

//@RegisterBeanMapper(Book.class)
interface BooksDao {
    @SqlUpdate("INSERT INTO books (author, title, year) VALUES (:author, :title, :year)")
    @GetGeneratedKeys
    int insert(@Bind("author") String author, @Bind("title") String title, @Bind("year") int year);

    @SqlUpdate("UPDATE books SET title = :title WHERE id = :id")
    void updateTitleById(@Bind("id") int id, @Bind("title") String title);

    @SqlUpdate("DELETE FROM books WHERE id = :id")
    void deleteById(@Bind("id") int id);

    @SqlQuery("SELECT * FROM books")
    List<Book> listBooks();
}
