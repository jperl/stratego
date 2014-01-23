// ----------------------- vote count ---------------------------- //

VotesCount = new Meteor.Collection('votes-count');

var subscribeToVoteCount = function (storiesCursor, story) {
    //subscribe to the vote counts on all of the items
    storiesCursor.observeChanges({
        added: function (associationId) {
            Associations.subscribeToVoteCount(story, associationId);
        },
        removed: function (associationId) {
            Associations.unsubscribeFromVoteCount(story, associationId);
        }
    });

    Deps.onInvalidate(function () {
        storiesCursor.forEach(function (association) {
            Associations.unsubscribeFromVoteCount(story, association._id);
        });
    });
};

// ------------------ add new association ------------------------ //

Template.associationsWidget.buttonText = function () {
    return this.type === Story.Type.PROBLEM ? 'Add Solution' : 'Add Problem';
};

Template.associationsWidget.placeholder = function () {
    return this.type === Story.Type.PROBLEM ? 'Add a solution...' : 'Add a problem...';
};

// ------------------ search  ------------------------ //

Template.associationsWidget.created = function () {
    var sourceStory = this.data;

    var addItemModel = new AddItemModel(function () {
        var title = this._text;

        if (sourceStory.type === Story.Type.PROBLEM) {
            var solution = Story.create(Story.Type.SOLUTION, title);
            Activity.vote(sourceStory, solution);
        } else {
            var problem = Story.create(Story.Type.PROBLEM, title);
            Activity.vote(sourceStory, problem);
        }

        Search.clear(sourceStory);
    });

    this.__component__.helpers({
        addItemModel: function () {
            return addItemModel;
        }
    });
};

Template.associationsWidget.events({
    'keyup .add-item-input': _.debounce(function (event) {
        var story = this;

        Search.clear(story);

        var search = $(event.target).val();
        if (search.length > 0) Search.associations(story, search);
    }, 1000)
});

var searchResultsCursor = function (addItemModel, story) {
    return StoriesSearch.find({
        search: addItemModel.getText(),
        "story.type": story.type === Story.Type.PROBLEM ? Story.Type.SOLUTION : Story.Type.PROBLEM
    });
};

Template.associationsWidget.searchResults = function (addItemModel, story) {
    var searchCursor = searchResultsCursor(addItemModel, story);
    subscribeToVoteCount(searchCursor, story);
    return searchCursor.map(function (item) {
        return item.story;
    });
};

Template.associationsWidget.searching = function (addItemModel,story) {
    return searchResultsCursor(addItemModel, story).count() > 0;
};

// ------------------ story cards ------------------------ //

Template.associationsWidget.items = function () {
    var cursor = Stories.find({ associationIds: this._id });
    subscribeToVoteCount(cursor, this);
    return cursor;
};

Template.associationsWidget.votesCount = function (sourceStory) {
    var votesCount = VotesCount.findOne(Associations.getSubscriptionId(sourceStory, this._id));
    return votesCount ? votesCount.count : 0;
};