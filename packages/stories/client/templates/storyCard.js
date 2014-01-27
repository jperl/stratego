// --------------------------- general ----------------------------- //

Template.storyCard.created = function () {
    var data = this.data;

    data._showComments = false;
    data._showCommentsDep = new Deps.Dependency;
    data.showComments = function () {
        data._showCommentsDep.depend();
        return data._showComments;
    };

    data._showAssociations = false;
    data._showAssociationsDep = new Deps.Dependency;
    data.showAssociations = function () {
        data._showAssociationsDep.depend();
        return data._showAssociations;
    };
};

Template.storyCardDetail.events({
    'click .card-story-delete-link': function (event, template) {
        var sourceStory = template.data;
        var confirmationMessage = 'Are you sure you want to delete the ' + (sourceStory.type === Story.Type.PROBLEM ? 'problem' : 'solution') + '?';
        if (confirm(confirmationMessage)) {
            var associatedStory = this;
            if (sourceStory._id === associatedStory._id) associatedStory = null;

            if (!associatedStory) Story.remove(sourceStory);
            else throw 'Cannot delete associations';
        }
    },
    'click .card-story-footer-link': function (event, template) {
        var target = $(event.target);
        var parent = target.parents('.card-story-wrapper');

        var expanded = !target.hasClass('active');
        parent.find('.card-story-footer-link.active').removeClass('active');
        if (expanded) target.addClass('active');

        if (target.hasClass('card-story-comments-link')) {
            template.data._showAssociations = false;
            template.data._showComments = expanded;
        } else if (target.hasClass('card-story-associations-link')) {
            template.data._showAssociations = expanded;
            template.data._showComments = false;
        }

        template.data._showCommentsDep.changed();
        template.data._showAssociationsDep.changed();
    },
    'click .vote-up': function (event, template) {
        event.stopPropagation();

        var sourceStory = template.data;
        var associatedStory = this;
        if (sourceStory._id === associatedStory._id) associatedStory = null;

        var target = $(event.currentTarget);

        var vote = !target.hasClass('voted');
        if (vote) {
            if (sourceStory) Activity.vote(sourceStory, associatedStory);
            else Activity.vote(this);

            target.addClass('voted');
        } else {
            if (sourceStory) Activity.unvote(sourceStory, associatedStory);
            else Activity.unvote(this);

            target.removeClass('voted');
        }
    },
    'blur .card-story-description': function (event) {
        // TODO: Post updated description data.
    }
});

Template.storyCard.isSolution = function (sourceStory) {
    //is a solution (and not an association)
    return this.type === Story.Type.SOLUTION && !sourceStory;
};

Template.storyCard.typeClass = function () {
    return this.type === Story.Type.PROBLEM ? 'card-story-problem' : 'card-story-solution';
};

// --------------------------- votes count ----------------------------- //

var votesCount = new Meteor.Collection('votes-count');

Template.storyCard.votesCount = function (sourceStory) {
    if (!sourceStory) return this.votesCount;

    var voteCountId = sourceStory._id._str + '-' + this._id._str;
    Meteor.subscribe('votes-count', voteCountId, sourceStory._id, this._id, Activity.getVoteType(sourceStory, this._id));

    var doc = votesCount.findOne(voteCountId);
    return doc ? doc.count : 0;
};

// ---------------------------- footer ------------------------------ //

//associations

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

//time

Template.storyCard.rendered = function () {
    $('.card-story .timestamp').timeago();
};