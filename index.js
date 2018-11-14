'use strict';

const shuffle = require('shuffle-seed');

const serve = require('koa-static');
const router = require('koa-router')();
const Koa = require('koa');

const fs = require('fs');

let app = new Koa();
let start = new Date(2018, 10, 11);
let index = fs.readFileSync('www/index.html', 'utf8');

// Want to make a random list I can pick from one at a time
// but never repeat and not change order when we restart
// I could just hardcode these shuffled but I want a but of
// a surprise
let drawings = shuffle.shuffle([
  'A big fuckoff house!',
  'A cute fucking dog!',
  'A cool fucking bike!',
  'A fucking baobab!',
  'Some pretty fucking flowers!',
  'Some fucking antlers!',
  'A pair of fucking wings!',
  'A fucking skull!',
  'Some fucking eyes',
  'A dark fucking cave',
  'Some fancy fucking cocktails',
  'A fucking crab!',
  'A fucking heart',
  'A fucking unicorn',
  'Some fucking trees'
], 'whatthefuckshouldidraw');

// But I already decided this is the first topic
drawings.unshift('A fucking beautiful swan!');

console.log(drawings.length);

function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

router.get('/', (ctx, next) => {

  let date = new Date();
  let currentWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  let weekStr = currentWeek.getFullYear() + '/' +
      (currentWeek.getMonth() + 1) + '/' +
      currentWeek.getDate();
  let weeksSince = weeksBetween(start, currentWeek);

  ctx.body = index
    .replace('{week}', weeksSince + 1)
    .replace('{date}', weekStr)
    .replace('{title}', drawings[weeksSince]);
});

app.use(router.routes());
app.use(serve('www'));

app.listen(process.env.PORT || 3000);
