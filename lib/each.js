module.exports = function(task, iterator = noop, callback = noop) {
    if (!(task instanceof Array)) {
        return callback(new Error("task should be an array!"));
    }

    if (typeof iterator !== "function") {
        return callback(new Error("iterator should be a function!"));
    }

    let completed = 0;

    function next(err) {
        if(err) {
            return callback(err);
        }
        if(++ completed >= task.length) {
            callback();
        }
    }

    task.forEach(item => iterator(item, next));
};

function noop() {}
