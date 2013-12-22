Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.map(function () {
    this.route('home', {
        path: '/',

        before: function () {
            //TODO if they are logged in
            Router.go('problems');

            this.stop();
        }
    });

    this.route('problems', {
        path: '/problems'
    });

    //TODO company name
    this.route('story', {
        path: '/problems/:param',
        controller: StoryController
    });

    this.route('story', {
        path: '/solutions/:param',
        controller: StoryController
    });
});

//call the route unload onbeforeunload
window.onbeforeunload = function () {
    var currentRoute = Router.current().route;
    if (currentRoute && currentRoute.options.unload) return currentRoute.options.unload();
};