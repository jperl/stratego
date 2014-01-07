Meteor.publish('comments', function (sourceId, skip, limit) {
    limit = limit ? limit : 25;
    var options = {
        limit: limit
    };
    if (skip) options.skip = skip;

    return Stories.find({
        sourceId: sourceId,
        type: Activity.Type.COMMENT
    }, options);
});