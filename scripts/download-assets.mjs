import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assets = {
  'cool.png': 'https://em-content.zobj.net/thumbs/240/apple/354/smiling-face-with-sunglasses_1f60e.png',
  'funny.png': 'https://em-content.zobj.net/thumbs/240/apple/354/grinning-squinting-face_1f606.png',
  'fast.png': 'https://em-content.zobj.net/thumbs/240/apple/354/high-voltage_26a1.png',
  'pretty.png': 'https://em-content.zobj.net/thumbs/240/apple/354/smiling-face-with-heart-eyes_1f60d.png',
  'robot.png': 'https://em-content.zobj.net/thumbs/240/apple/354/robot_1f916.png',
  'party.png': 'https://em-content.zobj.net/thumbs/240/apple/354/party-popper_1f389.png',
  'sparkles.png': 'https://em-content.zobj.net/thumbs/240/apple/354/sparkles_2728.png',
  'money.png': 'https://em-content.zobj.net/thumbs/240/apple/354/money-bag_1f4b0.png',
  'star-struck.png': 'https://em-content.zobj.net/thumbs/240/apple/354/star-struck_1f929.png',
  'failed.png': 'https://em-content.zobj.net/thumbs/240/apple/354/face-with-diagonal-mouth_1fae4.png',
};

const downloadDir = path.join(__dirname, '../public/assets/emojis');

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const downloadFile = (url, filename) => {
  const filePath = path.join(downloadDir, filename);
  
  if (fs.existsSync(filePath)) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: Status Code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve(null);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); 
      reject(err);
    });
  });
};

async function main() {
  try {
    await Promise.all(Object.entries(assets).map(([filename, url]) => downloadFile(url, filename)));
  } catch (error) {
    console.error('Error downloading assets:', error);
    process.exit(1);
  }
}

main();