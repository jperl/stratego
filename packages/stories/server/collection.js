Stories._insertHelper = function (story) {
    story.commentsCount = 0;

    if (!story._id) story._id = new Meteor.Collection.ObjectID();

    var activity = Activity.create({
        type: Activity.Type.CREATE
//                userId: userId
    }, story);
    Activities.insert(activity);
};

Stories.allow({
    insert: function (userId, doc) {
        Story.check(doc);

        Stories._insertHelper(doc);

        return true;
    },
    update: function (userId, doc, fields, modifier) {
        Story.check(doc);

        return true;
    },
    remove: function (userId, doc) {
        return false;
    }
});
