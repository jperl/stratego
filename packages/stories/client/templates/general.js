Template.storyFeedItem.events({
    'click .story-footer-link': function (event) {
        var target = $(event.target);

        var expand = !target.hasClass('active');

        if (expand) target.addClass('active');
        else target.removeClass('active');

        var storyId = this._id;
        if (target.hasClass('story-comments-link')) {
            var parent = target.parents('.story-feed-item-wrapper');
            if (expand) {
                Comments.subscribe(storyId);

                parent.removeClass('comments-hidden');
                parent.children('.comment-section-wrapper').removeClass('display-none');
            } else {
                Comments.unsubscribe(storyId);

                parent.addClass('comments-hidden');
                parent.children('.comment-section-wrapper').addClass('display-none');
            }
        }
    },
    'click .vote-up': function (event) {
        $(event.currentTarget).addClass('voted');
    },
    'click .story-favorite': function (event) {
        $(event.currentTarget).toggleClass('favorited');
    }
});

Template.storyFeedItem.getType = function () {
    var type = this.type;
    switch (type) {
        case 1:
            return 'story-type-problem';
            break;
        case 2:
            return 'story-type-solution';
            break;
    }
    return '';
};