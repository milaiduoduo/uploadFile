//参考官网upload例子
// const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Koa = require('koa');
var router = require('koa-router')();

import babel_co from 'babel-core/register';
import babel_po from 'babel-polyfill';

const fs = require('fs');
const app = new Koa();
const os = require('os');
const path = require('path');

// serve files from ./public

app.use(serve(path.join(__dirname,'/public')));
app.use(serve(path.join(__dirname,'/views')));

app.use(koaBody({ multipart: true }));

// custom 404

// app.use(async function(ctx, next) {
//     await next();
//     if (ctx.body || !ctx.idempotent) return;
//     ctx.redirect('/404.html');
// });

router.get('/get.do',async (ctx,next)=>{
    let req_query = ctx.request.query;
    let req_querystring = ctx.request.querystring;
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    let ctx_url = ctx.url;
    let ctx_originalUrl = ctx.originalUrl;
    let ctx_path = ctx.path;
    let returnObj = {
        'req_query':req_query,
        'req_querystring':req_querystring,
        'ctx_query':ctx_query,
        'ctx_querystring':ctx_querystring,
        'ctx_url':ctx_url,
        'ctx_originalUrl':ctx_originalUrl,
        'ctx_path':ctx_path
    };
    ctx.body=returnObj;
    console.log('returnObj',returnObj);
});

app.use(router.routes());

// listen
app.listen(3000);
console.log('listening on port 3000');