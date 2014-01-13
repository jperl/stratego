var addItem = function (event, template) {
    var parent = $(event.target).parent();
    var inputElement = parent.find('.add-item-input'), inputVal = inputElement.val();

    var minCharacters = template.__component__.minCharacters();
    if (inputVal.length < minCharacters) return;

    var context = template.__component__.context || function () {
        return null;
    };
    template.__component__.parent.addItem(inputVal, context());

    inputElement.val('');
    parent.find('.add-item-button').animate({opacity: 'hide'});
};

Template.addItem.events({
    'keyup .add-item-input': _.throttle(function (event, template) {
        var addItemButton = $(event.target).siblings('.add-item-button');

        var minCharacters = template.__component__.minCharacters();

        var valLength = $(event.target).val().length;
        if (valLength > minCharacters) {
            addItemButton.animate({opacity: 'show'});
        } else {
            addItemButton.animate({opacity: 'hide'});
        }
    }, 1000),
    'click .add-item-button': addItem,
    'keypress .add-item-input': function (event, template) {
        if (event.keyCode === 13) addItem(event, template);
    }
});