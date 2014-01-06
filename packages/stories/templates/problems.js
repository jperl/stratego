Template.newProblem.events({
    'keyup .new-problem-title': _.throttle(function (event) {
        var submitNewProblem = $('.add-new-problem');

        var titleLength = $(event.target).val().length;
        if (titleLength === 0) {
            submitNewProblem.animate({opacity: "hide"});
        }
        else if (titleLength > 5) {
            submitNewProblem.animate({opacity: "show"});
        }
    }, 1000),
    'click .add-new-problem': function () {
        var title = $('.new-problem-title').val();

        var id = Stories.insert({ type: Story.Type.PROBLEM, title: title });
    }
});

Template.storyFeedItem.events({
    'click .story-footer-link': function (event) {
        $(event.target).addClass('active');
        var parent = $(event.target).parents('.story-feed-item-wrapper').removeClass('comments-hidden');
        parent.children('.add-comment-section').removeClass('display-none');
        parent.children('.story-comment-section').removeClass('display-none');
    },
    'click .add-comment-button': function (event) {
        var message = $(event.target).prev().val();
        var comments = this.comments;
        var comment = { date: new Date(), message: message, userId: 0 };
        comments.push(comment);
        console.log(this);
        Stories.update({ _id: this._id}, { $set: { comments: comments } })
    }
});

Template.problems.items = function () {
    return Stories.find();
};