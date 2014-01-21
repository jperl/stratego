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

Meteor.publish('associations', function (storyId) {
    return Stories.find({ associationIds: storyId });
});

Meteor.startup(function () {
    var searchIndexName = 'search_stories_index';

//    Stories._dropIndex(searchIndexName); //do this whenever it changes
    Stories._ensureIndex({
        title: 'text',
        description: 'text'
    }, {
        name: searchIndexName
    });
});

// Mongo text search function
var searchStoriesText = function (searchText, filter, limit) {
    var fut = new Future();

    MongoInternals.defaultRemoteCollectionDriver().mongo.db.executeDbCommand({
        text: 'stories',
        search: searchText,
        limit: limit,
        project: {
            _id: 1 // Only take the ids
        },
        filter: filter
    }, function (error, results) {
        if (results && results.documents[0].ok === 1) {
            fut.return(results.documents[0].results);
        }
        else {
            fut.return('');
        }
    });

    return fut.wait();
};

var searchStoriesCursor = function (searchText, storyType) {
    check(searchText, String);
    check(storyType, Tools.MatchEnum(Story.Type));

    var limit = 10;

    var query = {};
    if (searchText && searchText !== '') {
        var results = searchStoriesText(searchText, {
            type: storyType
        }, limit);

        var storyIds = [];
        for (var i = 0; i < results.length; i++) {
            storyIds.push(results[i].obj._id);
        }

        query._id = {
            $in: storyIds
        };
    }

    return Stories.find(query, {limit: limit});
};

Meteor.publish('stories-search', function (searchText, storyType) {
    return Tools.publishCursor(this, 'stories-search', searchStoriesCursor(searchText, storyType));
});