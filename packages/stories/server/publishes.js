Meteor.publish('stories', function (details) {
    if (details === "top" || details === "latest" || details === "need-solutions" ||
        details === "my" || details === "discussed") {
        return Stories.find();
    }

    //show the specific story
    var storyId = Story.getId(details);
    return Stories.find(storyId);
});