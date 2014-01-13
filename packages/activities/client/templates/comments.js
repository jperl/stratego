Template.commentsWidget.addItem = Activity.comment;

Template.commentsWidget.comments = function () {
    return Activities.find({
        $or: [
            { problemId: this._id },
            { solutionId: this._id }
        ],
        type: Activity.Type.COMMENT
    })
};