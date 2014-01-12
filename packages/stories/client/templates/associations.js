var addNewAssociation = function (story) {
    var addItemInput = $('.add-item-input');
    var problemVal = addItemInput.val();
    if (problemVal.length <= 0) return;

    //Activity.associate(problemVal, story);
    addItemInput.val('');
};

Template.associationsWidget.items = function () {
    return Stories.find({ type: Story.Type.PROBLEM });
};

Template.associationsWidget.events({
    'click .add-item-button': function (){
        addNewComment(this);
    },
    'keypress .add-item-input': function (event) {
        if (event.keyCode === 13) addNewAssociation(this);
    }
});