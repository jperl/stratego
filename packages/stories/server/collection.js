Stories._insertHelper = function (story) {
    //reset these
    story.commentsCount = 0;
    story.votesCount = 0;

    Activity.add(story);
};

Stories._removeHelper = function (story) {
    Activity.remove(story);

    //TODO remove from all associations
    //TODO remove all votes
};

Stories.allow({
    insert: function (userId, doc) {
        Stories._insertHelper(doc);
        Story.check(doc);
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        return false;
    },
    remove: function (userId, doc) {
        Stories._removeHelper(doc);
        return true;
    }
});
