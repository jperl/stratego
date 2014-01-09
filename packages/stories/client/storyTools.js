StoryTools = {};

var pagingSubscriptions = [], currentPageStoryType, currentPageDetails, currentPage = 0, currentPageSize = 25;

StoryTools.setSubscription = function (type, details, pageSize) {
    currentPageStoryType = type;
    currentPageDetails = details;
    currentPage = 1;
    currentPageSize = pageSize;
};

StoryTools.loadMore = function () {
    var subscription = Meteor.subscribe('stories', currentPageStoryType, currentPageDetails,
        currentPage * currentPageSize, currentPageSize);

    currentPage++;

    pagingSubscriptions.push(subscription);
};

StoryTools.unload = function () {
    _.each(pagingSubscriptions, function (subscription) {
        subscription.stop();
    });

    pagingSubscriptions = [];
};