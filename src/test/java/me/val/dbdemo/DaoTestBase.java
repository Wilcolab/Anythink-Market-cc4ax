package me.val.dbdemo;

import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
import org.dbunit.operation.DatabaseOperation;
import org.h2.jdbcx.JdbcDataSource;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;

import java.sql.Connection;

public abstract class DaoTestBase<T> {
    T dao;
   IDatabaseConnection connection;

    private final Class<T> daoType;
    final String migrationPath;
    final String teardownScript;

    final RowMapper<Book> bookRowMapper;

    protected DaoTestBase(Class<T> daoType, String migrationPath, String teardownScript, RowMapper<Book> bookRowMapper) {
        this.daoType = daoType;
        this.migrationPath = migrationPath;
        this.teardownScript = teardownScript;
        this.bookRowMapper = bookRowMapper;
    }



   void setUpBase() throws Exception {
        // Set up H2 database
        JdbcDataSource dataSource = new JdbcDataSource();
        dataSource.setURL("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1");
        dataSource.setUser("sa");
        dataSource.setPassword("");

        Connection conn = dataSource.getConnection();
        // Apply schema
        conn.createStatement().execute("RUNSCRIPT FROM 'classpath:migrations.sql'");

        // DbUnit setup
        connection = new DatabaseConnection(conn);
        FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();
        DatabaseOperation.CLEAN_INSERT.execute(connection,
                builder.build(this.getClass().getClassLoader().getResourceAsStream( migrationPath)));

        // Setup JDBI and DAO
        Jdbi jdbi = Jdbi.create(dataSource);
        jdbi.installPlugin(new SqlObjectPlugin());
        jdbi.registerRowMapper(bookRowMapper);
        dao = jdbi.onDemand(daoType);
    }


    void tearDownBase() throws Exception {
        JdbcDataSource dataSource = new JdbcDataSource();
        dataSource.setURL("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1");
        dataSource.setUser("sa");
        dataSource.setPassword("");

        Connection conn = dataSource.getConnection();

        // Optionally, drop the table after each test
        conn.createStatement().execute(teardownScript);

        // Close connection
        conn.close();
        if (connection != null) {
            connection.close();
        }
    }
}