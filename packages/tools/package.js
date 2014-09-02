Package.describe({
    summary: 'Common javascript tools and helpers'
});

Package.on_use(function (api) {
    api.use(['deps', 'templating', 'underscore'], 'client');

    api.addFiles('tools.js', ['client', 'server']);
    api.addFiles('server_tools.js', 'server');

    api.addFiles([
        'templates/add_item.html', 'templates/add_item.js',
        'templates/nav_list_item.html', 'templates/nav_list_item.js',
        'templates/timeago.html', 'templates/timeago.js',
    ], 'client');

    api.export(['AddItemModel', 'Future', 'Tools']);
});