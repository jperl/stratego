Stories._insertHelper = function (story) {
    //reset these
    story.commentsCount = 0;
    story.votesCount = 0;

    Activity.add(story);
};

Stories._removeHelper = function (story) {
    //remove all the associations
    Stories.update({ associationIds: story._id }, { $pull: { associationIds: story._id } }, { multi: true });

    Activities.remove({
        $or: [
            { problemId: story._id },
            { solutionId: story._id }
        ]
    });

    Activity.remove(story);
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

Meteor.methods({
    updateStoryDescription: function (storyId, description) {
        Stories.update(storyId, { $set: {description: description} });
    }
});