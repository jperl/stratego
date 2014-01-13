Associations = {}; //votes with a problemId and solutionId

var subscriptions = {}, countSubscriptions = {};

Associations.subscribe = function (storyId) {
    subscriptions[storyId] = Meteor.subscribe('associations', storyId);
};

Associations.unsubscribe = function (storyId) {
    subscriptions[storyId].stop();
    delete subscriptions[storyId];
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
    countSubscriptions[subscriptionId] =
        Meteor.subscribe('votes-count', subscriptionId, source._id, associationId, Activity.getVoteType(source, associationId));
};

Associations.unsubscribeFromVoteCount = function (source, associationId) {
    var subscriptionId = Associations.getSubscriptionId(source, associationId);
    countSubscriptions[subscriptionId].stop();
    delete countSubscriptions[subscriptionId];
};