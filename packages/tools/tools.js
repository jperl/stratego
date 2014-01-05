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