Handlebars.registerHelper('spanOrLink', function (path) {
    var currentRoute = Router.current();
    if (path === currentRoute.path)
        return Template.span;

    return Template.link.withData({href: path});
});