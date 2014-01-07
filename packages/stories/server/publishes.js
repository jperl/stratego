Meteor.publish('stories', function (details, skip, limit) {
    limit = limit ? limit : 25;
    var options = {
        limit: limit
    };

    if (skip) options.skip = skip;

    if (details === "top" || details === "latest" || details === "need-solutions" ||
        details === "my" || details === "discussed") {
        return Stories.find({}, options);
    }

    //show the specific story
    var storyId = Story.getId(details);
    return Stories.find(storyId, options);
});

//Meteor.publish('stories', function (id) {
//    return Stories.find(id);
//});