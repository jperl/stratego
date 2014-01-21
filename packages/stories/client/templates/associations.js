VotesCount = new Meteor.Collection('votes-count');

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

StoriesSearch = new Meteor.Collection('stories-search');

Deps.autorun(function () {
    var searchText = Session.get('storyAssociationsSearch');
    var associationsType = Session.get('associationsType');

    if (searchText && searchText.length >= 4) {
        Meteor.subscribe('stories-search', searchText, associationsType);
    }
});

Template.associationsWidget.searchResults = function () {
    var story = this;

    var cursor = StoriesSearch.find();

    //subscribe to the vote counts on all of the items
    cursor.observeChanges({
        added: function (associationId) {
            Associations.subscribeToVoteCount(story, associationId);
        },
        removed: function (associationId) {
            Associations.unsubscribeFromVoteCount(story, associationId);
        }
    });

    return cursor;
};

Template.associationsWidget.searching = function () {
    var searchText = Session.get('storyAssociationsSearch');
    return searchText && searchText.length > 0;
};

// ------------------ story cards ------------------------ //

Template.associationsWidget.items = function () {
    var story = this;

    var cursor = Stories.find({ associationIds: story._id });

    //subscribe to the vote counts on all of the items
    cursor.observeChanges({
        added: function (associationId) {
            Associations.subscribeToVoteCount(story, associationId);
        },
        removed: function (associationId) {
            Associations.unsubscribeFromVoteCount(story, associationId);
        }
    });

    return cursor;
};

Template.associationsWidget.votesCount = function (sourceStory) {
    var votesCount = VotesCount.findOne(Associations.getSubscriptionId(sourceStory, this._id));
    return votesCount ? votesCount.count : 0;
};