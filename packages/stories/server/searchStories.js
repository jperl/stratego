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
var textSearchStories = function (search, filter, limit) {
    var fut = new Future();

    MongoInternals.defaultRemoteCollectionDriver().mongo.db.executeDbCommand({
        text: 'stories',
        search: search,
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

var searchStoriesCursor = function (search, storyType) {
    check(search, String);
    check(storyType, Tools.MatchEnum(Story.Type));

    var limit = 10;

    var query = {};
    if (search && search !== '') {
        var results = textSearchStories(search, {
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

Meteor.publish('stories-search', function (search, storyType) {
    return Tools.publishCursor('stories-search', this, searchStoriesCursor(search, storyType), function (item) {
        return {
            search: search,
            story: item
        };
    });
});