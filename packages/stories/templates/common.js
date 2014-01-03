Handlebars.registerHelper('navListItem', function (path) {
    var currentRoute = Router.current();
    if (path === currentRoute.path)
        return Template.navListItemActive;

    return Template.navListItemLink.withData({href: path});
});