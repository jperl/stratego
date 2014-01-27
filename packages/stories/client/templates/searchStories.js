var storiesSearch = new Meteor.Collection('stories-search');

// -------------------------------- Model --------------------------------------- //

SearchStoriesModel = function (sourceStory) {
    var self = this;

    self._search = '';
    self._searchDep = new Deps.Dependency;

    self._sourceStory = sourceStory;
    self._searchStoryType = sourceStory.type === Story.Type.PROBLEM ? Story.Type.SOLUTION : Story.Type.PROBLEM;
};

SearchStoriesModel.prototype.getSearch = function () {
    this._searchDep.depend();
    return this._search;
};

SearchStoriesModel.prototype.search = function (text) {
    var self = this;

    if (text.length > 0) {
        Meteor.subscribe('stories-search', text, self._searchStoryType);
    }

    self._search = text;
    self._searchDep.changed();
};

SearchStoriesModel.prototype.results = function () {
    return storiesSearch.find({
        search: this.getSearch(),
        "story.type": this._searchStoryType
    });
};

// -------------------------------- Template --------------------------------------- //

Template.searchStories.results = function (model) {
    return model.results().map(function (item) {
        return item.story;
    });
};

Template.searchStories.searching = function (model) {
    return model.results().count();
};