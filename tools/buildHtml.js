// This script copies src/index.html into /dist/index.html
// This is a good example of using Node and c
// heerio to do a simple file transformation.
// In this case, the transformation is useful si
// nce we only use a separate css file in prod.
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint-disable no-console */

fs.readFile('client/src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

// since a separate spreadsheet is only utilized for the
// production build, need to dynamically add this here.
  $('head').append('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('client/dist/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
