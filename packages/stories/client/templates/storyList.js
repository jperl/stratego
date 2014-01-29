StoriesCount = new Meteor.Collection('stories-count');

// ----------------------- interface for controller ----------------------- //

StoryList = {};

var pagingSubscriptions = [],
    pageDetails,
    currentPage = 0,
    currentPageSize = 25;

StoryList.subscribedTo = function (details, pageSize) {
    pageDetails = details;
    currentPage = 1;
    currentPageSize = pageSize;
};

StoryList.unload = function () {
    _.each(pagingSubscriptions, function (subscription) {
        subscription.stop();
    });

    pagingSubscriptions = [];
};

// ------------------------------- templates -------------------------------- //

var initializeStoryListTemplates = function (listTemplateName, pagerTemplateName, storyType) {
    Template[listTemplateName].created = function () {
        var addItemModel = new AddItemModel(function () {
            Story.create(storyType, this._text);
        });
        var searchStoriesModel = new SearchStoriesModel(storyType);

        Deps.autorun(function () {
            var searchText = addItemModel.getText();
            searchStoriesModel.search(searchText);
        });

        this.__component__.helpers({
            addItemModel: addItemModel,
            searchStoriesModel: searchStoriesModel
        });
    };

    Template[listTemplateName].items = function () {
        return Stories.find({ type: storyType });
    };

    Template[pagerTemplateName].canLoadMore = function () {
        var storiesCount = StoriesCount.findOne();
        if (!storiesCount) return;

        return storiesCount.count > Stories.find().count();
    };

    Template[pagerTemplateName].events({
        //load more
        'click .card-btn': function () {
            var subscription = Meteor.subscribe('stories', storyType, pageDetails,
                {
                    skip: currentPage * currentPageSize,
                    limit: currentPageSize
                });

            currentPage++;
            pagingSubscriptions.push(subscription);
        }
    });
};

initializeStoryListTemplates('problems', 'loadMoreProblems', Story.Type.PROBLEM);

initializeStoryListTemplates('solutions', 'loadMoreSolutions', Story.Type.SOLUTION);