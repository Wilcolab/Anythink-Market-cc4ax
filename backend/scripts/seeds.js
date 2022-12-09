//TODO: seeds script should come here, so we'll be able to put some data in our local env
require("dotenv").config();
const seeder = require("mongoose-seed");

// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI, function () {
  // Load Mongoose models
  seeder.loadModels(["models/User.js", "models/Item.js", "models/Comment.js"]);

  // Clear specified collections
  seeder.clearModels(["Item", "User", "Comment"], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

// Data array containing seed data - documents organized by Model
const users = [];
const items = [];
const comments = [];

for (const i = 0; i < 105; i++) {
  users.push({
    username: `username${i}`,
    email: `ex${i}@email.com`,
    bio: `bio${i}`,
    image: "image",
  });
  items.push({
    title: `item-${i}`,
    description: `description ${i}`,
    body: `body template`,
    tagList: ["dragons"],
  });
  comments.push({
    id: i,
    body: `comment${i}`,
  });
}
const data = [
  {
    model: "Item",
    documents: items,
  },
  {
    model: "User",
    documents: users,
  },
  {
    model: "Comment",
    documents: comments,
  },
];