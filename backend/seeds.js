
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");

i=0;
while (i < 100) {
   
    var user = new User();
    var randstr = (Math.random() + 1).toString(36).substring(7);
    user.username = randstr;
    user.email = randstr+'@gmail.com';
    user.setPassword(randstr);
    
    user.save();

    while (i < 100) {

        var item = new Item({"item":{"title":"tewt","description":"wefwef","image":"wefwef","tagList":["wefwef"]}});

        item.seller = user;

        item.save();

        while (i < 100) {

            var comment = new Comment('comment');
            comment.item = item;
            comment.seller = user;
        
            comment.save().then(function() {
            req.item.comments = req.item.comments.concat([comment]);
                return req.item.save();
            });
    

        }
       
    }

}