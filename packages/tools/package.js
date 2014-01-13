Package.describe({
    summary: 'Common javascript tools and helpers'
});

Package.on_use(function (api) {
    api.use('templating', 'client');
    api.use('underscore', 'client');

    api.add_files('tools.js', ['client', 'server']);

    api.add_files('serverTools.js', 'server');

    api.add_files('templates/addItem.html', 'client');
    api.add_files('templates/addItem.js', 'client');
    api.add_files('templates/navListItem.html', 'client');
    api.add_files('templates/navListItem.js', 'client');

    api.export('Tools');
});