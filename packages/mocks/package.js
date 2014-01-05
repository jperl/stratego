Package.describe({
    summary: 'Mock data framework'
});

Package.on_use(function (api) {
    api.use('underscore', 'server');

    api.add_files('mock.js', ['client', 'server']);
    api.add_files('mock_server.js', 'server');

    api.export('Mocks');
});