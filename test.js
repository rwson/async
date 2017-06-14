const fs = require("fs");
const async = require("async");
const request = require("request");

const sites = ['www.baidu.com','github.com','www.npmjs.com', 'www.zhihu.com'];

const async2 = require("./lib");

// async2.waterfall([
//     function (cb) {
//         console.log(new Date);
//         setTimeout(function () {
//             cb(null, 123);
//         }, 2000);
//     },
//     function (arg, cb) {
//         console.log(new Date);
//         setTimeout(function () {
//             console.log(arg);
//             cb(null, 123, 456);
//         }, 2000);
//     },
//     function (arg1, arg2, cb) {
//         console.log(new Date);
//         console.log(arg1, arg2);
//     }
// ], function (ex) {
//     if (ex) {
//         throw ex;
//     }
// });

function downloadFavicon(site, next) {
    let addr = `https://${site}/favicon.ico`;
    let file = `./${site}.ico`;
    request.get(addr)
        .pipe(fs.createWriteStream(file))
        .on('error', (err) => {
            console.error(`${url} Download failed: ${err.message}`);
            next();
        })
        .on('finish', next);
}

async2.each(sites, downloadFavicon, function (err) {
    if (err) {
        console.log('err', err);
    }
    console.log('over');
});

