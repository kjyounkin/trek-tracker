const http = require('http');
async function checkTile(z, x, y) {
  return new Promise((resolve) => {
    http.get('http://lotrproject.com/map/meincludes/tiles/' + z + '/' + x + '/' + y + '.jpg', (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}
async function findBounds(z) {
  let maxX = 0; let maxY = 0;
  for (let i = 0; i < 64; i++) { if (await checkTile(z, i, 0)) maxX = i; else if(i>0) break; }
  for (let j = 0; j < 64; j++) { if (await checkTile(z, 0, j)) maxY = j; else if(j>0) break; }
  return { maxX, maxY };
}
async function main() {
  for (let z = 1; z <= 6; z++) {
    const bounds = await findBounds(z);
    console.log('Z:', z, 'maxX:', bounds.maxX, 'maxY:', bounds.maxY, 'Total:', (bounds.maxX+1)*(bounds.maxY+1));
    if (bounds.maxX === 0 && bounds.maxY === 0) break;
  }
}
main();
