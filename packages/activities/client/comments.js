Comments = {};

var commentSubscriptions = {};

Comments.subscribe = function (storyId) {
    commentSubscriptions[storyId] = Meteor.subscribe('comments', storyId);
};

Comments.unsubscribe = function (storyId) {
    commentSubscriptions[storyId].stop();
    delete commentSubscriptions[storyId];
};