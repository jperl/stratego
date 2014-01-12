var addNewComment = function (story) {
    var addItemInput = $('.add-item-input');
    var message = addItemInput.val();
    if (message.length <= 0) return;

    Activity.comment(message, story);
    addItemInput.val('');
};

Template.commentsWidget.comments = function () {
    return Activities.find({
        $or: [
            { problemId: this._id },
            { solutionId: this._id }
        ],
        type: Activity.Type.COMMENT
    })
};

Template.commentsWidget.events({
    'click .add-item-button': function () {
        addNewComment(this);
    },
    'keypress .add-item-input': function (event) {
        if (event.keyCode === 13) addNewComment(this);
    }
});