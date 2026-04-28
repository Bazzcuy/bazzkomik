const axios = require('axios');
const cheerio = require('cheerio');

async function testUrl(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    
    console.log(`\n=== Testing URL: ${url} ===`);
    console.log("Total img tags on page:", $('img').length);
    
    const bacaKomikImgs = $('#Baca_Komik img');
    console.log("Images in #Baca_Komik img:", bacaKomikImgs.length);
    
    // Let's see where the largest cluster of images is!
    const divImages = $('div').map((i, el) => {
      const imgCount = $(el).find('img').length;
      if (imgCount > 5) {
        return {
          tag: el.tagName,
          id: $(el).attr('id'),
          class: $(el).attr('class'),
          imgCount
        };
      }
      return null;
    }).get().filter(Boolean);
    
    console.log("Divs with > 5 images:", divImages);
    
    if (bacaKomikImgs.length > 0) {
      console.log("First image in #Baca_Komik:", bacaKomikImgs.first().attr('src') || bacaKomikImgs.first().attr('data-src'));
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function run() {
  // Let's test multiple URLs
  await testUrl('https://komiku.org/ch/jujutsu-kaisen-chapter-250/');
  await testUrl('https://komiku.org/ch/one-piece-chapter-1111/');
}

run();
