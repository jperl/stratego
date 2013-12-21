Router.map(function () {
    var router = this;
    router.route('home', {path: '/'});

    _.each(['/problem/:_id', '/solution/:_id'], function (path) {
        router.route('story', {
            path: path,
            before: function () {
                this.subscribe('stories', this.params._id);
            },
            unload: function () {
                return Template.story.unload();
            }
        });
    });
});

//call the route unload onbeforeunload
window.onbeforeunload = function () {
    var currentRoute = Router.current().route;
    if (currentRoute && currentRoute.options.unload) return currentRoute.options.unload();
};