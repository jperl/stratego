Tools.publishCounter = function (params) {
    var collection = params.collection,
        count = 0,
        id = Random.id(),
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
