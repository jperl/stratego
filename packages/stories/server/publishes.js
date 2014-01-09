Meteor.publish('stories', function (type, details, skip, limit) {
    limit = limit ? limit : 25;
    var options = {
        limit: limit
    };

    if (skip) options.skip = skip;

    if (details === "top" || details === "latest" || details === "need-solutions" ||
        details === "my" || details === "discussed") {
        return Stories.find({
            type: type
        }, options);
    }

    //show the specific story
    var storyId = Story.getId(details);
    return Stories.find(storyId, options);
});