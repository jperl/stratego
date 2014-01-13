VotesCount = new Meteor.Collection('votes-count');

// ------------------ add new association ------------------------ //

var addNewAssociation = function (sourceStory, event) {
    var addItemInput = $(event.target).parent().find('.add-item-input');

    var title = addItemInput.val();
    if (title.length <= 0) return;

    if (sourceStory.type === Story.Type.PROBLEM) {
        var solution = Story.create(Story.Type.SOLUTION, title);
        Activity.vote(sourceStory, solution);
    } else {
        var problem = Story.create(Story.Type.PROBLEM, title);
        Activity.vote(sourceStory, problem);
    }

    addItemInput.val('');
};

Template.associationsWidget.events({
    'click .add-item-button': function () {
        addNewAssociation(this, event);
    },
    'keypress .add-item-input': function (event) {
        if (event.keyCode === 13) addNewAssociation(this, event);
    }
});

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
