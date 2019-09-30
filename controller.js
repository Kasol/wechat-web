const fs = require('fs');
const Router = require('koa-router');
const router = new Router({
    prefix: `/wechat`,
});
const init = function(app, controllerDir='controller'){
    const files = fs.readdirSync(`${__dirname}/${controllerDir}/`);
    let jsFiles = [];
    let dirs = [];
    /** 
     * 是js文件则认定为controller
     * 否则作为文件夹,等待下一次递归
    */
    files.forEach((f) => {
        if (f.endsWith('.js')) {
            jsFiles.push(f);
        } else if (fs.lstatSync(`${__dirname}/${controllerDir}/${f}`).isDirectory()) {
            dirs.push(f);
        }
    });
    /** 
     * 取出controller对应的方法并执行
     * 挂载route
    */
    for (let f of jsFiles) {
        f=f.substring(0, f.length - 3);
        let modulePath = `${__dirname}/${controllerDir}/${f}`;
        const fn  = require(modulePath);
        fn(router);
        app.use(router.routes());
    }
    /** 
     * 对于新的文件夹,递归执行该逻辑
     * 注意controllerDir需要重新赋值
    */
   for (let f of dirs) {
        init(app, `${controllerDir}/${f}/`);
   }

};

module.exports = {
    init:init
};