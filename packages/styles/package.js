Package.describe({
    summary: 'Application styles and libraries.'
});

Package.on_use(function (api) {
    api.use('less', 'client');

    api.addFiles(['main.less'], 'client');
});