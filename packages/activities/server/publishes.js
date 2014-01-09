Meteor.publish('comments', function (storyId, skip, limit) {
    limit = limit ? limit : 25;
    var options = {
        limit: limit
    };
    if (skip) options.skip = skip;


    return Activities.find({
        $or: [{ problemId: storyId }, { solutionId: storyId }],
        type: Activity.Type.COMMENT
    }, options);
});