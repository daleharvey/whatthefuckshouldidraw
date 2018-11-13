const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'a fucking beautiful swan';
});

app.listen(process.env.PORT || 3000);
