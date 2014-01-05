Package.describe({
    summary: 'Activities (associations, comments, views, votes)'
});

Package.on_use(function (api) {
    api.use('templating', 'client');
    api.use('underscore', 'client');

    api.use('tools');

    api.add_files('shared/collection.js', ['client', 'server']);
    api.add_files('shared/activity.js', ['client', 'server']);

    api.export('Activities');
    api.export('Activity');
});