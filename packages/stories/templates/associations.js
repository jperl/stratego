// ------------------ add new association ------------------------ //

Template.associations.created = function () {
    var sourceStory = this.data;

    Meteor.subscribe('associations', sourceStory._id);

    var addItemModel = new AddItemModel(function () {
        var title = this._text;

        if (sourceStory.type === Story.Type.PROBLEM) {
            var solution = Story.create(Story.Type.SOLUTION, title);
            Activity.vote(sourceStory, solution);
        } else {
            var problem = Story.create(Story.Type.PROBLEM, title);
            Activity.vote(sourceStory, problem);
        }

        searchStoriesModel.search('');
    });

    var searchStoriesModel = new SearchStoriesModel(sourceStory.type === Story.Type.PROBLEM ? Story.Type.SOLUTION : Story.Type.PROBLEM);

    Deps.autorun(function () {
        var searchText = addItemModel.getText();
        searchStoriesModel.search(searchText);
    });

    this.__component__.helpers({
        addItemModel: addItemModel,
        searchStoriesModel: searchStoriesModel
    });
};

Template.associations.buttonText = function () {
    return this.type === Story.Type.PROBLEM ? 'Add Solution' : 'Add Problem';
};

Template.associations.placeholder = function () {
    return this.type === Story.Type.PROBLEM ? 'Add a solution...' : 'Add a problem...';
};

// ------------------------ story cards --------------------------- //

Template.associations.items = function () {
    return Stories.find({ associationIds: this._id });
};