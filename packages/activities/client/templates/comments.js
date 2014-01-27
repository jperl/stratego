Template.comments.created = function () {
    var story = this.data;

    Meteor.subscribe('comments', story._id);

    this.__component__.helpers({
        addItemModel: new AddItemModel(function () {
            Activity.comment(this._text, story);
        })
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
    'click .card-story-footer-link': function (event) {
        event.stopPropagation();

        if (confirm('Are you sure you want to delete the comment?')) {
            Activity.remove(this);
        }
    }
});

Template.comment.rendered = function () {
    $(".comment .timestamp").timeago();
};
