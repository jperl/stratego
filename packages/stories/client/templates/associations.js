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

// ------------------ story cards ------------------------ //

Template.associationsWidget.items = function (sourceStory) {
    var cursor = Stories.find({ associationIds: this._id });

    //subscribe to the vote counts on all of the items
    cursor.observeChanges({
        added: function (id) {
            Associations.subscribeToVoteCount(sourceStory, id);
        },
        removed: function (id) {
            Associations.unsubscribeFromVoteCount(sourceStory, id);
        }
    });

    return cursor;
};

Template.associationsWidget.votesCount = function (sourceStory) {
    var votesCount = VotesCount.findOne(Associations.getSubscriptionId(sourceStory, this._id));
    return votesCount ? votesCount.count : 0;
};
