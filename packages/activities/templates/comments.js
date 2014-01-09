Template.commentsWidget.comments = function () {
    return Activities.find({
        sourceId: this._id,
        type: Activity.Type.COMMENT
    })
};

Template.commentsWidget.events({
    'click .add-comment-button': function (event) {
        var addCommentInput = $(event.target).prev();
        var message = addCommentInput.val();

        Activities.insert({
            type: Activity.Type.COMMENT,

            sourceId: this._id,
            sourceType: this.type,

            value: message
        });

        addCommentInput.val('');
    }
});