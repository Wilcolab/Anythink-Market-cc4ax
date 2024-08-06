package me.val.dbdemo;

@SuppressWarnings("unused")
public class Book {
    private final int id;
    private final String author;
    private final String title;
    private final int year;

    private final String genre;

    public Book(int id, String author, String title, int year, String genre) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.year = year;
        this.genre = genre;
    }

    public Book(int id, String author, String title, int year) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.year = year;
        this.genre = "Unknown";
    }


    public int getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public int getYear() {
        return year;
    }

    public String getGenre() {
        return genre;
    }
}
