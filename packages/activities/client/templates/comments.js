Template.comments.created = function () {
    var story = this.data;

    var addItemModel = new AddItemModel(function () {
        Activity.comment(this._text, story);
    });

    this.__component__.helpers({
        addItemModel: function () {
            return addItemModel;
        }
    });
};

Template.comments.items = function () {
    return Activities.find({
        $or: [
            { problemId: this._id },
            { solutionId: this._id }
        ],
        type: Activity.Type.COMMENT
    })
};

Template.comments.events({
    'click .story-delete-link': function (event) {
        event.stopPropagation();

        if (confirm('Are you sure you want to delete the comment?')) {
            Activity.remove(this);
        }
    }
});

Template.comment.rendered = function () {
    $(".comment .timestamp").timeago();
};
