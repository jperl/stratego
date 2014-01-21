var clearSearch = function (storyId, target) {
    target.val('');
    Session.set('storiesSearchText', '');
    Tools.unsubscribe('stories-search', storyId);
};

Template.storyFeedItem.events({
    'click .story-delete-link': function (event, template) {
        var sourceStory = template.data;
        var confirmationMessage = 'Are you sure you want to delete the ' + (sourceStory.type === Story.Type.PROBLEM ? 'problem' : 'solution') + '?';
        if (confirm(confirmationMessage)) {
            var associatedStory = this;
            if (sourceStory._id === associatedStory._id) associatedStory = null;

            if (!associatedStory) Story.remove(sourceStory);
            else throw 'Cannot delete associations';
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

        var associationSection = parent.children('.association-section-wrapper');
        associationSection.addClass('display-none');

        if (target.hasClass('story-comments-link')) {
            if (expanded) {
                Tools.subscribe('comments', storyId, function () {
                    return Meteor.subscribe('comments', storyId);
                });
                parent.children('.comment-section-wrapper').removeClass('display-none');
            } else {
                Tools.unsubscribe('comments', storyId);
            }
        } else if (target.hasClass('story-associations-link')) {
            clearSearch(storyId, associationSection.find('.add-item-input'));

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
    },
    'blur .story-description': function (event) {
        // TODO: Post updated description data.
    },
    'keyup .add-item-input': _.debounce(function (event, template) {
        var searchText = $(event.target).val();

        var story = this;
        Tools.unsubscribe('stories-search', story._id);

        if (searchText.length >= 4) {
            Tools.subscribe('stories-search', story._id, function () {
                return Meteor.subscribe('stories-search', searchText, story.type === Story.Type.PROBLEM ? Story.Type.SOLUTION : Story.Type.PROBLEM);
            });
        }

        Session.set('storiesSearchText', searchText);
    }, 1000)
});

StoriesSearch = new Meteor.Collection('stories-search');

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