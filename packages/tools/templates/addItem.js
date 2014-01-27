// -------------------------------- Model --------------------------------------- //

AddItemModel = function (addItemFunc) {
    this._text = '';
    this._textDependency = new Deps.Dependency;
    this._onAddItem = addItemFunc;
};

AddItemModel.prototype.getText = function () {
    this._textDependency.depend();
    return this._text;
};

AddItemModel.prototype._setText = _.debounce(function (text) {
    this._text = text;
    this._textDependency.changed();
}, 250);

// -------------------------------- Template --------------------------------------- //

var addItem = function (event, template) {
    var parent = $(event.target).parent();
    var inputElement = parent.find('.add-item-input'), inputVal = inputElement.val();

    var minCharacters = template.__component__.minCharacters();
    if (inputVal.length < minCharacters) return;

    var model = template.__component__.model();
    model._onAddItem();

    inputElement.val('');
    model._setText('');

    parent.find('.add-item-button').animate({opacity: 'hide'});
};

var showOrHideAddButton = _.throttle(function (minCharacters, textLength, addItemButton) {
    addItemButton.animate({opacity: textLength > minCharacters ? 'show' : 'hide'});
}, 1000);

Template.addItem.events({
    'keyup .add-item-input': function (event, template) {
        var text = $(event.target).val();

        var model = template.__component__.model();
        model._setText(text);

        var minCharacters = template.__component__.minCharacters();
        var addItemButton = $(event.target).siblings('.add-item-button');
        showOrHideAddButton(minCharacters, text.length, addItemButton);
    },
    'click .add-item-button': addItem,
    'keypress .add-item-input': function (event, template) {
        if (event.keyCode === 13) addItem(event, template);
    }
});