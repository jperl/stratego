Associations = {}; //votes with a problemId and solutionId

var subscriptions = {};

Associations.subscribe = function (storyId) {
    subscriptions[storyId] = Meteor.subscribe('associations', storyId);
};

Associations.unsubscribe = function (storyId) {
    subscriptions[storyId].stop();
    delete subscriptions[storyId];
};