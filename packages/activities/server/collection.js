Activities._insertHelper = function (doc) {
    if (doc.type === Activity.Type.COMMENT &&
        (doc.sourceType === Activity.SourceType.PROBLEM || doc.sourceType === Activity.SourceType.SOLUTION)) {
        Stories.update({ _id: doc.sourceId}, { $inc: { commentsCount: 1 } });
    }
};

Activities.allow({
    insert: function (userId, doc) {
        Activity.check(doc);
        Activities._insertHelper(doc);

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
