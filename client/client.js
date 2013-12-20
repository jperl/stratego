Router.map(function () {
    this.route('home', {path: '/'});

    var subscribeStory = function () {
        this.subscribe(this.params._id);
    };

    var loadStory = function () {
        return Stories.findOne(this.params._id);
    };

    this.route('story', {
        path: '/problem/:_id',
        before: subscribeStory,
        data: loadStory
    });

    this.route('story', {
        path: '/solution/:_id',
        before: subscribeStory,
        data: loadStory
    });
});