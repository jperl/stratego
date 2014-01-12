Template.storyFeedItem.events({
    'click .story-footer-link': function (event) {
        var target = $(event.target);
        var parent = target.parents('.story-feed-item-wrapper');

        var expanded = !target.hasClass('active');
        parent.find(".story-footer-link.active").removeClass("active");
        if (expanded) target.addClass('active');

        var storyId = this._id;

        parent.children('.comment-section-wrapper').addClass('display-none');
        parent.children('.association-section-wrapper').addClass('display-none');

        if (target.hasClass('story-comments-link')) {
            if (expanded) {
                Comments.subscribe(storyId);
                parent.children('.comment-section-wrapper').removeClass('display-none');
            } else {
                Comments.unsubscribe(storyId);
            }
        } else if (target.hasClass('story-associations-link')) {
            if (expanded) {
                Comments.subscribe(storyId);
                parent.children('.association-section-wrapper').removeClass('display-none');
            } else {
                Comments.unsubscribe(storyId);
            }
        }
    },
    'click .vote-up': function (event) {
        var target = $(event.currentTarget);
        if (!target.hasClass('voted')) {
            Activity.vote(this);
            target.addClass('voted');
        } else {
            //TODO: Add unvote and fix backend multiple voting.
            //Activity.unvote(this);
            //target.removeClass('voted');
        }
    },
    'click .story-favorite': function (event) {
        $(event.currentTarget).toggleClass('favorited');
    }
});

Template.storyFeedItem.typeClass = function () {
    var type = this.type;
    if (type === 1) return 'story-type-problem';
    return 'story-type-solution';
};

Template.storyFeedItem.isProblem = function () {
    return this.type === Story.Type.PROBLEM;
};