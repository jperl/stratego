Package.describe({
    summary: 'Routing, controllers, main navigation templates.'
});

Package.on_use(function (api) {
    api.use(['templating', 'iron:router', 'stories'], 'client');

    api.addFiles(['controllers.js', 'layout.html', 'layout.js', 'routing.js'], 'client');
});