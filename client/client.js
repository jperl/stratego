Router.map(function () {
    var router = this;
    router.route('home', {path: '/'});

    //TODO company name

    _.each(['/problem/:param', '/solution/:param'], function (path) {
        router.route('story', {
            path: path,
            before: function () {
                //param will be id-title. ex DhsjvoA34CRH4739T-fix-the-coffee-machine
                var parameter = this.params.param;
                var slash = parameter.indexOf('-');

                //remove any slash from the id, then set the _id parameter
                var id = this.params._id = parameter.substring(0, slash != -1 ? parameter.indexOf('-') : parameter.length);
                this.subscribe('stories', id);
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