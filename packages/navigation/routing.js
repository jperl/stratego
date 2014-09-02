Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.map(function () {
    this.route('home', {
        path: '/',

        onBeforeAction: function (pause) {
            //TODO if they are logged in
            Router.go('/problems/top');

            pause();
        }
    });

    //TODO organization name
    this.route('problems', {
        path: '/problems/:details?',
        data: {
            page: 'problems-page'
        },
        controller: StoryController
    });

    this.route('solutions', {
        path: '/solutions/:details?',
        data: {
            page: 'solutions-page'
        },
        controller: StoryController
    });

    this.route('notFound', { path: '*' });
});

//call the route unload onbeforeunload
window.onbeforeunload = function () {
    var currentRoute = Router.current().route;
    if (currentRoute && currentRoute.options.onStop) return currentRoute.options.onStop();
};