package me.val;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class DummyProvider implements TweetsProvider {
    private final List<Tweet> tweets = new ArrayList<>();
    @Override
    public List<Tweet> getTweets(LocalDateTime after, LocalDateTime until) {
        return tweets.stream()
                .filter(x -> x.getTweetedAt().isAfter(after)
                        && x.getTweetedAt().isBefore(until))
                .collect(toList());

    }

    @Override
    public void writeTweet(Tweet tweet) {
        tweets.add(tweet);
    }

    @Override
    public List<Tweet> getTweets() {
        return tweets;
    }
}
