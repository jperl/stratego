Stories._insertHelper = function (doc) {
    doc.commentsCount = 0;

    if (!doc._id) doc._id = new Meteor.Collection.ObjectID();

    Activities.insert({
        sourceId: doc._id,
        sourceType: doc.type === Story.Type.PROBLEM ? Activity.SourceType.PROBLEM : Activity.SourceType.SOLUTION,
        type: Activity.Type.CREATE
//                userId: userId
    });
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
