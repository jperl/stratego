var getId = function () {
    var details = Router.current().params.details;
    return Story.getId(details);
};

Template.storyHeader.rendered = function () {
    //wait a little so the databinding happens before we setup the editors
    //they are going to make the rendered callback happen later in a later release of Meteor UI
    //when that happens we can remove the setTimeout
    Meteor.setTimeout(function () {
        new MediumEditor('.title', {
            disableReturn: true,
            disableToolbar: true,
            forcePlainText: true
        });

        new MediumEditor('.description', {
            disableToolbar: true,
            forcePlainText: true
        });
    }, 50);
};

Template.storyHeader.data = function () {

    var story = Stories.findOne(getId());
    return story;
};

Template.storyHeader.titlePlaceholder = function () {
    var story = Template.storyHeader.data();
    if (!story) return '';

    return 'Type the ' + (story.type === Story.Type.PROBLEM ? 'problem' : 'solution');
};

var setFields = {};

var updateStory = function () {
    if (_.keys(setFields).length < 1) return;

    Stories.update(getId(), { $set: setFields });
    setFields = {};
};

Template.storyHeader.events({
    'blur .title, blur .description': updateStory,
    'keyup .title': function (event) {
        //TODO max characters
        var newTitle = $(event.target).html();
        setFields.title = newTitle;
    },
    'keyup .description': function (event) {
        var newDescription = $(event.target).html();
        setFields.description = newDescription;
    }
});

Template.story.unload = updateStory;