module.exports = (app) => {
    app.use(async (ctx, next) => { // 请求头配置
        ctx.set({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
        });
        await next();
    });
}