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

router.get('/get.do', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
        var req_query, req_querystring, ctx_query, ctx_querystring, ctx_url, ctx_originalUrl, ctx_path, returnObj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        req_query = ctx.request.query;
                        req_querystring = ctx.request.querystring;
                        ctx_query = ctx.query;
                        ctx_querystring = ctx.querystring;
                        ctx_url = ctx.url;
                        ctx_originalUrl = ctx.originalUrl;
                        ctx_path = ctx.path;
                        returnObj = {
                            'req_query': req_query,
                            'req_querystring': req_querystring,
                            'ctx_query': ctx_query,
                            'ctx_querystring': ctx_querystring,
                            'ctx_url': ctx_url,
                            'ctx_originalUrl': ctx_originalUrl,
                            'ctx_path': ctx_path
                        };

                        ctx.body = returnObj;
                        console.log('returnObj', returnObj);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.use(router.routes());

// listen
app.listen(3000);
console.log('listening on port 3000');