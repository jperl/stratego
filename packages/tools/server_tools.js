Future = Npm.require('fibers/future');

Tools.publishCounter = function (params) {
    var collection = params.collection,
        count = 0,
        id = params.id || Random.id(),
        init = true,
        pub = params.handle,
        handle = collection.find(params.filter, params.options).observeChanges({
            added: function () {
                count++;
                if (init) return;

                return pub.changed(params.name, id, {
                    count: count
                });
            },
            removed: function () {
                count--;
                if (init) return;

                return pub.changed(params.name, id, {
                    count: count
                });
            }
        });

    init = false;
    pub.added(params.name, id, {
        count: count
    });
    pub.ready();
    return pub.onStop(function () {
        return handle.stop();
    });
};

Tools.publishCursor = function (name, pub, cursor, map) {
    var handle = cursor.observe({
        added: function (item) {
            var id = item._id;
            if (map) item = map(item);

            return pub.added(name, id, item);
        },
        changed: function (item) {
            var id = item._id;
            if (map) item = map(item);

            return pub.changed(name, id, item);
        },
        removed: function (item) {
            return pub.removed(name, item._id);
        }
    });

    pub.ready();

    return pub.onStop(function () {
        return handle.stop();
    });
};