package me.val.dbdemo;

import me.val.dbdemo.Book;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RatedBookMapper implements RowMapper<Book> {
    @Override
    public Book map(ResultSet rs, StatementContext ctx) throws SQLException {
        return new Book(
                rs.getInt("id"),
                rs.getString("author"),
                rs.getString("title"),
                rs.getInt("year"),
                rs.getString("genre")
        );
    }
}
