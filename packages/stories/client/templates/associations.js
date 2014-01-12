var addNewAssociation = function (story, event) {
    var addItemInput = $(event.target).parent().find('.add-item-input');

    var title = addItemInput.val();
    if (title.length <= 0) return;

    if (story.type === Story.Type.PROBLEM) {
        var solution = Story.create(Story.Type.SOLUTION, title);
        Activity.vote(solution, story);
    } else {
        var problem = Story.create(Story.Type.PROBLEM, title);
        Activity.vote(problem, story);
    }

    addItemInput.val('');
};

Template.associationsWidget.placeholder = function () {
    return this.type === Story.Type.PROBLEM ? 'Add a solution...' : 'Add a problem...';
};

Template.associationsWidget.buttonText = function () {
    return this.type === Story.Type.PROBLEM ? 'Add Solution' : 'Add Problem';
};

Template.associationsWidget.items = function () {
    return Stories.find({ associationIds: this._id });
};

Template.associationsWidget.events({
    'click .add-item-button': function () {
        addNewAssociation(this, event);
    },
    'keypress .add-item-input': function (event, template) {
        if (event.keyCode === 13) addNewAssociation(this, event);
    },
    'click .vote-up': function (event, template) {
        var target = $(event.currentTarget);

        var parentStory = template.__component__.parent.templateInstance.data;
        if (!target.hasClass('voted')) {
            Activity.vote(this, parentStory);
            target.addClass('voted');
        } else {
            //TODO: Add unvote and fix backend multiple voting.
            //Activity.unvote(this);
            //target.removeClass('voted');
        }
    },
});