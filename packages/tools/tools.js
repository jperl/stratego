Tools = {};

Tools.IsNullOrUndefined = function (value) {
    return typeof value === "undefined" || value === null;
};

Tools.MatchEnum = function (enumObject, optional) {
    return Match.Where(function (value) {
        if (optional && Tools.IsNullOrUndefined(value)) return true;

        return _.contains(_.values(enumObject), value);
    });
};

Tools.getRandomItem = function (array) {
    var index = Tools.getRandomInt(0, array.length);
    return array[index];
};

Tools.getRandomInt = function (minInclusive, maxExclusive) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
};

Tools.randomTimes = function (minInclusive, maxExclusive, func, items) {
    for (var i = 0; i < Tools.getRandomInt(minInclusive, maxExclusive); i++) {
        if (items) func(Tools.getRandomItem(items));
        else func();
    }
};