package me.val;

import java.time.LocalDateTime;
import java.util.List;

public interface TweetsProvider {
    public List<Tweet> getTweets(LocalDateTime after, LocalDateTime until);
    public void writeTweet(Tweet tweet);
    public List<Tweet> getTweets();
}
