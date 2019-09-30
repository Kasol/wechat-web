module.exports = (router) => {
    router.get('/index', route.index);
}
const route  = {
    index: async (ctx, next) => {
        const { name, age } = ctx.query;
        const context = {
            name,
            age
        };
        ctx.render('index.html',context)
    },
};
