'use strict';

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//参考官网upload例子
// const logger = require('koa-logger');
var serve = require('koa-static');
var koaBody = require('koa-body');
var Koa = require('koa');
var router = require('koa-router')();

var fs = require('fs');
var app = new Koa();
var os = require('os');
var path = require('path');

// serve files from ./public

app.use(serve(path.join(__dirname, '/public')));
app.use(serve(path.join(__dirname, '/views')));

app.use(koaBody({ multipart: true }));

// custom 404

// app.use(async function(ctx, next) {
//     await next();
//     if (ctx.body || !ctx.idempotent) return;
//     ctx.redirect('/404.html');
// });


// post获取上传的文件
router.post('/post', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!('POST' != ctx.method)) {
                            _context.next = 4;
                            break;
                        }

                        _context.next = 3;
                        return next();

                    case 3:
                        return _context.abrupt('return', _context.sent);

                    case 4:
                        console.log('request.body::::', ctx.request.body, ctx.request.body.userName, ctx.request.body.email);
                        //取得表单元素
                        // let params = ctx.request.body.fields;
                        // //解析参数的代码
                        // let useName = params.userName;
                        // let email = params.email;
                        // //console.log('post params:::::useName,email',useName,email);
                        //
                        // //取得上传文件
                        // let files = ctx.request.body.files.file;
                        // files = Array.isArray(files)?files:Array.of(files); //将单个对象转换为数组
                        // if(files.length>0){
                        //     for(var item of files) {
                        //         if(item.size==0) continue;
                        //         // console.log('size!=0');
                        //         // console.log('item:::::::::::::::::::::::::::::::::::::::::',item);
                        //         var tmpath= item['path'];
                        //         var tmparr =item['name'].split('.');
                        //         var ext ='.'+tmparr[tmparr.length-1];
                        //         var newpath =path.join('public/upload', parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext);
                        //         const stream = fs.createWriteStream(newpath);//创建一个可写流
                        //         fs.createReadStream(tmpath).pipe(stream);//可读流通过管道写入可写流
                        //         // console.log('uploading %s -> %s', item.name, stream.path);
                        //         // console.log('-----------------------------------------------------');
                        //         //ctx.redirect('/');
                        //     }
                        // }

                        ctx.body = ctx.request.body;

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.post('/showPostBody.do', function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('post ctx.request:::::::::::', ctx.request);
                        ctx.body = ctx.request.body; //JSON.stringify(ctx.request.body);

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

router.get('/showGetBody.do', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
        var params, id, subject;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log('ctx.query,ctx.querystring:::::::::::::', ctx.query, ctx.querystring);
                        //ctx.query是对象: {id:'123',subject:'JS'}
                        //ctx.querystring是字符串: id=123&subject=JS
                        params = ctx.query;
                        id = params.id;
                        subject = params.subject;

                        console.log('id::::', id, "subject::::", subject);
                        ctx.body = ctx;

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

app.use(router.routes());

// listen
app.listen(3000);
console.log('listening on port 3000');