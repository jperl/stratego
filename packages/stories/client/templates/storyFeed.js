StoriesCount = new Meteor.Collection('stories-count');

// ----------------------- interface for controller ----------------------- //

StoryFeed = {};

var pagingSubscriptions = [],
    pageDetails,
    currentPage = 0,
    currentPageSize = 25;

StoryFeed.subscribedTo = function (details, pageSize) {
    pageDetails = details;
    currentPage = 1;
    currentPageSize = pageSize;
};

StoryFeed.stop = function () {
    _.each(pagingSubscriptions, function (subscription) {
        subscription.stop();
    });

    pagingSubscriptions = [];
};

// ------------------------------- templates -------------------------------- //

// TODO XXX
//Template.storyFeed.created = function () {
//    var addItemModel = new AddItemModel(function () {
//        Story.create(storyType, this._text);
//    });
//    var searchStoriesModel = new SearchStoriesModel(storyType);
//
//    Deps.autorun(function () {
//        var searchText = addItemModel.getText();
//        searchStoriesModel.search(searchText);
//    });
//
//    this.helpers({
//        addItemModel: addItemModel,
//        searchStoriesModel: searchStoriesModel
//    });
//};

//Template.storyFeed.items = function () {
//    return Stories.find({ type: this.type });
//};
//
//Template.storyFeed.canLoadMore = function () {
//    var storiesCount = StoriesCount.findOne();
//    if (!storiesCount) return;
//
//    return storiesCount.count > Stories.find().count();
//};
//
//Template.storyFeed.events({
//    //load more
//    'click .card-btn': function () {
//        var subscription = Meteor.subscribe('stories', storyType, pageDetails,
//            {
//                skip: currentPage * currentPageSize,
//                limit: currentPageSize
//            });
//
//        currentPage++;
//        pagingSubscriptions.push(subscription);
//    }
//});