Stories.allow({
    insert: function (userId, doc) {
        Story.check(doc);

        Activities.insert({
            sourceId: doc._id,
            sourceType: doc.type === Story.Type.PROBLEM ? Activity.SourceType.PROBLEM : Activity.SourceType.SOLUTION,
            type: Activity.Type.CREATE
//                userId: userId
        });

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
