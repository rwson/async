module.exports = function(task, callback = noop) {
    if (!(task instanceof Array)) {
        return callback(new Error("task should be an array!"));
    }
    (function next(...args) {
        //  第一个参数如果不为空就直接执行callback
        if (args[0]) {
            return callback(args[0]);
        }

        if (task.length) {
            //  取得当前要执行的函数
            let fn = task.shift();
            fn.apply(null, [...args.slice(1), onlyOnce(next)]);
        } else {
            callback.apply(null, args);
        }
    })();
};

function onlyOnce(cb) {
    let flag = false;
    return function(...args) {
        if (flag) {
            return cb(new Error('cb already called'));
        }
        cb.apply(null, args);
        flag = true;
    };
}

function noop() {}
