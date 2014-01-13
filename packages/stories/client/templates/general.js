Template.storyFeedItem.events({
    'click .story-delete-link': function (event, template) {
        var sourceStory = template.data;
        var confirmationMessage = 'Are you sure you want to delete the ' + (sourceStory.type === Story.Type.PROBLEM ? 'problem' : 'solution') + '?';
        if (confirm(confirmationMessage)) {
            var associatedStory = this;
            if (sourceStory._id === associatedStory._id) associatedStory = null;

            if (!associatedStory) Story.remove(sourceStory);
            else throw 'Associations delete not implemented yet';
        }
    },
    'click .story-footer-link': function (event) {
        var target = $(event.target);
        var parent = target.parents('.story-feed-item-wrapper');

        var expanded = !target.hasClass('active');
        parent.find('.story-footer-link.active').removeClass('active');
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
                Associations.subscribe(storyId);
                parent.children('.association-section-wrapper').removeClass('display-none');
            } else {
                Associations.unsubscribe(storyId);
            }
        }
    },
    'click .vote-up': function (event, template) {
        event.stopPropagation();

        var sourceStory = template.data;
        var associatedStory = this;
        if (sourceStory._id === associatedStory._id) associatedStory = null;

        var target = $(event.currentTarget);
        if (!target.hasClass('voted')) {
            if (sourceStory) Activity.vote(sourceStory, associatedStory);
            else Activity.vote(this);

            target.addClass('voted');
        } else {
            if (sourceStory) Activity.unvote(sourceStory, associatedStory);
            else Activity.unvote(this);

            target.removeClass('voted');
        }
    }
});

Template.storyCard.associationText = function () {
    return (this.type === Story.Type.PROBLEM ? 'Solution' : 'Problem') +
        //plural or singular
        (this.associationIds.length === 1 ? '' : 's');
};

Template.storyCard.commentsText = function () {
    return this.commentsCount + ' ' + 'Comment' +
        //plural or singular
        (this.commentsCount === 1 ? '' : 's');
};

Template.storyCard.isSolution = function (sourceStory) {
    //is a solution (and not an association)
    return this.type === Story.Type.SOLUTION && !sourceStory;
};

Template.storyCard.typeClass = function () {
    return this.type === Story.Type.PROBLEM ? 'story-type-problem' : 'story-type-solution';
};