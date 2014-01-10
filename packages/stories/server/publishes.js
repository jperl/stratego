Meteor.publish('stories', function (type, details, skip, limit) {
    limit = limit ? limit : 25;
    var options = {
        limit: limit
    };
    if (skip) options.skip = skip;

    return Stories.find({
        type: type
    }, options);
});


Meteor.publish('stories-count', function (type, details) {
    var params = {
        type: type
    };

    return Tools.publishCounter({
        handle: this,
        name: 'stories-count',
        collection: Stories,
        filter: params
    });
});
