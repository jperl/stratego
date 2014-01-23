Template.commentsWidget.addItemModel = function () {
    var story = this;

    return new AddItemModel(function () {
        Activity.comment(this._text, story);
    });
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
    'click .story-delete-link': function (event) {
        event.stopPropagation();

        if (confirm('Are you sure you want to delete the comment?')) {
            Activity.remove(this);
        }
    }
});

Template.commentWidget.rendered = function () {
    $(".comment .timestamp").timeago();
};
