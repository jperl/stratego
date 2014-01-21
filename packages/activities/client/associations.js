Associations = {}; //votes with a problemId and solutionId

Associations.subscribe = function (storyId) {
    Tools.subscribe('associations', storyId, function () {
        return Meteor.subscribe('associations', storyId);
    });
};

Associations.unsubscribe = function (storyId) {
    Tools.unsubscribe('associations', storyId);
};

var hashMapping = {};
Associations.getSubscriptionId = function (source, associationId) {
    var hash = source._id._str + associationId._str + Activity.getVoteType(source, associationId);
    if (hashMapping[hash]) return hashMapping[hash];

    hashMapping[hash] = Random.id();

    return hashMapping[hash];
};

Associations.subscribeToVoteCount = function (source, associationId) {
    var subscriptionId = Associations.getSubscriptionId(source, associationId);

    Tools.subscribe('votes-count', subscriptionId, function () {
        return Meteor.subscribe('votes-count', subscriptionId, source._id, associationId, Activity.getVoteType(source, associationId));
    });
};

Associations.unsubscribeFromVoteCount = function (source, associationId) {
    var subscriptionId = Associations.getSubscriptionId(source, associationId);

    Tools.unsubscribe('votes-count', subscriptionId);
};