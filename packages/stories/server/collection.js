Stories._insertHelper = function (story) {
    //reset these
    story.commentsCount = 0;
    story.votesCount = 0;

    Activity.create(story);
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
        return false;
    }
});
