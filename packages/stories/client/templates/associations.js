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

Template.associationsWidget.addItem = function (title, sourceStory) {
    if (sourceStory.type === Story.Type.PROBLEM) {
        var solution = Story.create(Story.Type.SOLUTION, title);
        Activity.vote(sourceStory, solution);
    } else {
        var problem = Story.create(Story.Type.PROBLEM, title);
        Activity.vote(sourceStory, problem);
    }
};

Template.associationsWidget.buttonText = function () {
    return this.type === Story.Type.PROBLEM ? 'Add Solution' : 'Add Problem';
};

Template.associationsWidget.placeholder = function () {
    return this.type === Story.Type.PROBLEM ? 'Add a solution...' : 'Add a problem...';
};

// ------------------ search  ------------------------ //

Template.associationsWidget.searchResults = function () {
    var cursor = StoriesSearch.find();
    subscribeToVoteCount(cursor, this);
    return cursor;
};

Template.associationsWidget.searching = function () {
    var searchText = Session.get('storiesSearchText');
    return searchText && searchText.length > 0;
};

// ------------------ story cards ------------------------ //

Template.associationsWidget.items = function (a, b) {
    var cursor = Stories.find({ associationIds: this._id });
    subscribeToVoteCount(cursor, this);
    return cursor;
};

Template.associationsWidget.votesCount = function (sourceStory) {
    var votesCount = VotesCount.findOne(Associations.getSubscriptionId(sourceStory, this._id));
    return votesCount ? votesCount.count : 0;
};