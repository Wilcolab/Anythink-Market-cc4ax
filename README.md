## Dummy Application for Testing

curl -X POST http://localhost:8080/v1/tweets -H 'Content-Type: application/json' -d '{"tweetText": "This is my tweet!"}'
curl -X GET 'http://localhost:8080/v1/tweets?after=2022-03-22T10:00:00&until=2022-03-22T11:00:00'
curl -X GET http://localhost:8080/v1/tweets


