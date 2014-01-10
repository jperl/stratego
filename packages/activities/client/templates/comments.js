var addNewComment = function (story) {
    var addCommentInput = $('.add-comment-input');
    var message = addCommentInput.val();

    if (message.length <= 0) return;

    var activity = Activity.create({
        type: Activity.Type.COMMENT,
        value: message
    }, story);

    Activities.insert(activity);
    addCommentInput.val('');
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
    'click .add-comment-button': function (){
        addNewComment(this);
    },
    'keypress .add-comment-input': function (event) {
        if (event.keyCode === 13) addNewComment(this);
    }
});