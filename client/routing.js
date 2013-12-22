Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.map(function () {
    this.route('home', {
        path: '/',

        before: function () {
            //TODO if they are logged in
            Router.go('/problems/top');

            this.stop();
        }
    });

    //TODO organization name
    this.route('problems', {
        path: '/problems/:details?',
        controller: StoryController
    });

    this.route('solutions', {
        path: '/solutions/:details?',
        controller: StoryController
    });
});

//call the route unload onbeforeunload
window.onbeforeunload = function () {
    var currentRoute = Router.current().route;
    if (currentRoute && currentRoute.options.unload) return currentRoute.options.unload();
};