StoriesSearch = new Meteor.Collection('stories-search');

Search = {};

Search.clear = function (story) {
    Tools.unsubscribe('stories-search', story._id);
};

Search.associations = function (story, text) {
    Tools.subscribe('stories-search', story._id, function () {
        return Meteor.subscribe('stories-search', text, story.type === Story.Type.PROBLEM ? Story.Type.SOLUTION : Story.Type.PROBLEM);
    });
};