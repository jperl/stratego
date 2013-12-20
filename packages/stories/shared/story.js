StoryUtils = {
    fromJSONValue: function (document) {
        return new Story(document);
    }
};

Story = function (document) {
//    if (document._id) this._id = document._id;

    this.description = document.description;
    this.title = document.title;
    this.type = document.type;

    this._titleDependency = new Deps.Dependency;
    this._descriptionDependency = new Deps.Dependency;
};

Story.Type = {
    PROBLEM: 1,
    SOLUTION: 2
};

Story.prototype = {
    constructor: Story,

    toString: function () {
        return this.text;
    },

    clone: function () {
        var clonedDocument = EJSON.clone(this.toJSONValue());

        return new Story(clonedDocument);
    },

    equals: function (other) {
        if (!(other instanceof Story))
            return false;

        var that = this;
        return _.isEqual(that.document, other.document);
    },

    typeName: function () {
        return 'Story';
    },

    toJSONValue: function () {
        return {
            description: this.description,
            title: this.title,
            type: this.type
        };
    }
};

EJSON.addType('Story', StoryUtils.fromJSONValue);

Story.prototype.check = function () {
    check(this, Match.Where(function (document) {
        console.log("Match", document);
        return document.type === Story.Type.PROBLEM || document.type === Story.Type.SOLUTION;
    }));

//    check(this._document, {
//        title: Match.Optional(String),
//        description: Match.Optional(String)
//    });

    return true;
};

Story.prototype.title = function (value) {
    if (value) {
        this._document.title = value;
        this._titleDependency.changed();
    } else {
        this._titleDependency.depend();
    }

    return this._document.title;
};

Story.prototype.description = function (value) {
    if (value) {
        this._document.title = value;
        this._descriptionDependency.changed();
    } else {
        this._descriptionDependency.depend();
    }

    return this._document.description;
};

Story.prototype.comments = function () {
    //TODO
};