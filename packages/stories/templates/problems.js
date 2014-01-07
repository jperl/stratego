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

        var id = Stories.insert({ type: Story.Type.PROBLEM, title: title, votes: 0 });
    }
});

Template.storyFeedItem.events({
    'click .story-footer-link': function (event) {
        $(event.target).addClass('active');
        var parent = $(event.target).parents('.story-feed-item-wrapper').removeClass('comments-hidden');
        //parent.children('.add-comment-section').removeClass('display-none');
        parent.children('.comment-section-wrapper').removeClass('display-none');
    },
    'click .add-comment-button': function (event) {
        var addCommentInput = $(event.target).prev();
        var message = addCommentInput.val();
        var comments = this.comments;
        var comment = { date: new Date(), message: message, userId: 0 };
        comments.push(comment);
        Stories.update({ _id: this._id}, { $set: { comments: comments } });
        addCommentInput.val('');
    },
    'click .vote-up': function (event) {
        $(event.currentTarget).addClass('voted');
        //Stories.update({ _id: this._id }, { $inc: { votes: 1 } })
    },
    'click .story-favorite': function (event) {
        $(event.currentTarget).toggleClass('favorited');
    }
});

Template.problems.items = function () {
    return Stories.find();
};