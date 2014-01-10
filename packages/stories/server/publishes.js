Meteor.publish('stories', function (type, details, options) {
    if (!options) {
        options = {
            limit: 25
        };
    }

    //this will change
    options.sort = { votesCount: -1 };

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
