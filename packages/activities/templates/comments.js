Template.commentsWidget.comments = function () {
    return Activities.find({
        $or: [{ problemId: this._id }, { solutionId: this._id }],
        type: Activity.Type.COMMENT
    })
};

Template.commentsWidget.events({
    'click .add-comment-button': function (event) {
        var addCommentInput = $(event.target).prev();
        var message = addCommentInput.val();

        var activity = Activity.create({
            type: Activity.Type.COMMENT,
            value: message
        }, this);
        Activities.insert(activity);

        addCommentInput.val('');
    }
});