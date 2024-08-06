package me.val;

import java.time.LocalDateTime;
import java.util.UUID;

public class Tweet {
    private final String tweetId;
    private final String tweetText;
    private final LocalDateTime tweetedAt;

    public Tweet(String tweetId, String tweetText, LocalDateTime tweetedAt) {
        this.tweetId = tweetId;
        this.tweetText = tweetText;
        this.tweetedAt = tweetedAt;
    }

    public String getTweetId() {
        return tweetId;
    }

    public String getTweetText() {
        return tweetText;
    }

    public LocalDateTime getTweetedAt() {
        return tweetedAt;
    }
}
