package me.val.dbdemo;


import me.val.dbdemo.Book;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

import java.util.List;

interface RatedBooksDao {
    @SqlUpdate("INSERT INTO rated_books (author, title, year, genre) VALUES (:author, :title, :year, :genre)")
    @GetGeneratedKeys
    int insert(@Bind("author") String author, @Bind("title") String title, @Bind("year") int year, @Bind("genre") String genre);

    @SqlUpdate("UPDATE rated_books SET title = :title WHERE id = :id")
    void updateTitleById(@Bind("id") int id, @Bind("title") String title);

    @SqlUpdate("DELETE rated_books books WHERE id = :id")
    void deleteById(@Bind("id") int id);

    @SqlQuery("SELECT * FROM rated_books")
    List<Book> listBooks();
}
