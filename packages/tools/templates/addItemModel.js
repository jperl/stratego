AddItemModel = function (onAddItem) {
    this._text = '';
    this._textDependency = new Deps.Dependency;
    this._onAddItem = onAddItem;
};

AddItemModel.prototype.getText = function () {
    this._textDependency.depend();
    return this._text;
};

AddItemModel.prototype.setText = function (text) {
    this._text = text;
    this._textDependency.changed();
};