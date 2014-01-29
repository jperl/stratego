Handlebars.registerHelper('timeago', function (time) {
    return Template._timeago.withData({ time: time });
});

Template._timeago.timeString = function () {
    return this.time && this.time.toISOString();
};

Template._timeago.rendered = function () {
    $(this.firstNode).timeago();
};