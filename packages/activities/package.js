Package.describe({
    summary: 'Activities a user performs (associations, comments, views, votes)'
});

Package.on_use(function (api) {
    api.use('templating', 'client');
    api.use('underscore', 'client');

    api.use('tools');
    api.use('mocks');

    api.add_files('shared/activity.js', ['client', 'server']);
    api.add_files('shared/collection.js', ['client', 'server']);
    api.add_files('shared/mocks.js', ['client', 'server']);

    api.add_files('client/templates/comments.html', 'client');
    api.add_files('client/templates/comments.js', 'client');

    api.add_files('server/publishes.js', 'server');
    api.add_files('server/collection.js', 'server');

    api.export('Activities');
    api.export('Activity');
});