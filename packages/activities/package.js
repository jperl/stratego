Package.describe({
    summary: 'Activities a user performs (associations, comments, views, votes)'
});

Package.on_use(function (api) {
    api.use(['templating', 'underscore'], 'client');
    api.use(['tools', 'mocks'], ['client', 'server']);

    api.addFiles(['activity.js', 'activities.js', 'mocks.js'], ['client', 'server']);
    api.addFiles(['templates/comments.html', 'templates/comments.js'], 'client');
    api.addFiles(['activities_server.js'], 'server');

    api.export(['Activities', 'Activity'], ['client', 'server']);
});