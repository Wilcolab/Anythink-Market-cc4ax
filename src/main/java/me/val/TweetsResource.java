package me.val;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.time.LocalDateTime;
import java.util.List;

import static java.time.LocalDateTime.parse;
import static java.util.UUID.randomUUID;

@Path("v1/tweets")
public class TweetsResource {
    private final TweetsProvider provider;


    public TweetsResource(TweetsProvider provider) {
        this.provider = provider;
    }

    // TODO: Add validators here to sanitize date params if present
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Tweet> getTweetsByTime(@QueryParam("after") String after, @QueryParam("until") String until) {
        return (after == null) ?
                provider.getTweets()
                : provider.getTweets(parse(after),
                parse(until));
    }

    // TODO: Add validation here, including tweet length.
    @POST
    public void create(String tweet) {
        provider.writeTweet(new Tweet(
                randomUUID().toString(),
                tweet,
                LocalDateTime.now()
        ));
    }
}
