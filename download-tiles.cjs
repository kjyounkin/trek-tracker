const http = require('http');
const fs = require('fs');
const path = require('path');

async function downloadTile(z, x, y) {
  const dir = path.join('public', 'tiles', String(z), String(x));
  const filePath = path.join(dir, String(y) + '.jpg');
  
  if (fs.existsSync(filePath)) return;
  
  return new Promise((resolve) => {
    http.get('http://lotrproject.com/map/meincludes/tiles/' + z + '/' + x + '/' + y + '.jpg', (res) => {
      if (res.statusCode === 200) {
        fs.mkdirSync(dir, { recursive: true });
        const stream = fs.createWriteStream(filePath);
        res.pipe(stream);
        stream.on('finish', () => resolve(true));
      } else {
        res.resume();
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function main() {
  let downloaded = 0;
  for (let z = 1; z <= 6; z++) {
    const maxGrid = Math.pow(2, z); // 2, 4, 8, 16, 32, 64
    for (let x = 0; x < maxGrid; x++) {
      let promises = [];
      for (let y = 0; y < maxGrid; y++) {
        promises.push(downloadTile(z, x, y));
      }
      const results = await Promise.all(promises);
      downloaded += results.filter(Boolean).length;
    }
    console.log('Finished zoom level ' + z + ', Total downloaded so far: ' + downloaded);
  }
}
main();
