Meteor.publish('comments', function (storyId) {
    return Activities.find({
        $or: [
            { problemId: storyId },
            { solutionId: storyId }
        ],
        type: Activity.Type.COMMENT
    });
});

Meteor.publish('votes-count', function (publishId, sourceId, associationId, voteType) {
    var filter = Activity._voteFilter(sourceId, associationId, voteType);

    return Tools.publishCounter({
        id: publishId,
        handle: this,
        name: 'votes-count',
        collection: Activities,
        filter: filter
    });
});