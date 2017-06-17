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


// post获取上传的文件
router.post('/post',async function(ctx, next) {
    // ignore non-POSTs
    if ('POST' != ctx.method) return await next();
    console.log('request.body::::',ctx.request.body,ctx.request.body.userName,ctx.request.body.email);
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

    ctx.body=ctx.request.body;
});

router.post('/showPostBody.do',async (ctx,next)=>{
    console.log('post ctx.request:::::::::::',ctx.request);
    ctx.body = ctx.request.body;//JSON.stringify(ctx.request.body);
});

router.get('/showGetBody.do',async(ctx,next)=>{
    console.log('ctx.query,ctx.querystring:::::::::::::',ctx.query,ctx.querystring);
    //ctx.query是对象: {id:'123',subject:'JS'}
    //ctx.querystring是字符串: id=123&subject=JS
    let params = ctx.query;
    let id=params.id;
    let subject=params.subject;
    console.log('id::::',id,"subject::::",subject);
    ctx.body =  ctx;
})

app.use(router.routes());

// listen
app.listen(3000);
console.log('listening on port 3000');