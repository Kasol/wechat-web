module.exports = (router) => {
    router.get('/api/getWeather', route.getWeather);
}
const route  = {
    getWeather: async (ctx) => {
        ctx.body = {
            date:Date()
        };
    },
};
