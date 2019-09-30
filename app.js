const Koa = require('koa');
const controller = require('./controller');
const templating=require('./middleware/templating');
const bodyParse=require('koa-bodyparser');

const isProduction = process.env.NODE_ENV === 'production';
const app = new Koa();

//记录路由和访问时间
app.use(async (ctx,next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
        await next();
    execTime = new Date().getTime() - start;
    ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    // ctx.set("Access-Control-Expose-Headers", "X-Requested-With");
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//挂载render方法
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(bodyParse());

controller.init(app);


app.listen(3000,()=>{
    console.log('Application is running in 3000');
});