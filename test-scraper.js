const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://komiku.org/ch/jujutsu-kaisen-chapter-250/').then(res => {
  const $ = cheerio.load(res.data);
  const imgs = $('#Baca_Komik img').map((i,el) => $(el).attr('src')).get();
  console.log("Images:", imgs.slice(0, 5));
}).catch(console.error);
