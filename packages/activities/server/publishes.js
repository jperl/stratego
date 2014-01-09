Meteor.publish('comments', function (storyId) {
    return Activities.find({
        $or: [
            { problemId: storyId },
            { solutionId: storyId }
        ],
        type: Activity.Type.COMMENT
    });
});