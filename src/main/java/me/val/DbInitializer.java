package me.val;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class DbInitializer {
    private final String url;

    public DbInitializer(String url) {
        this.url = url;
    }

    public void initialize() throws SQLException {
        String createTableSql = "CREATE TABLE tweets (tweet_id VARCHAR(30) PRIMARY KEY, tweet_text VARCHAR(140), time TIMESTAMP)";
        try (Connection conn = DriverManager.getConnection(url);
             var createTable = conn.prepareStatement(createTableSql)) {
            createTable.executeUpdate();
        }
    }
}
