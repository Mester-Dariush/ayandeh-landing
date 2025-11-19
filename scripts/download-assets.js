const fs = require('fs');
const path = require('path');
const https = require('https');

// Define the assets to download
// Key: The filename to save as
// Value: The remote URL
const assets = {
  // Home Page Emojis
  'cool.png': 'https://em-content.zobj.net/thumbs/240/apple/354/smiling-face-with-sunglasses_1f60e.png',
  'funny.png': 'https://em-content.zobj.net/thumbs/240/apple/354/grinning-squinting-face_1f606.png',
  'fast.png': 'https://em-content.zobj.net/thumbs/240/apple/354/high-voltage_26a1.png',
  'pretty.png': 'https://em-content.zobj.net/thumbs/240/apple/354/smiling-face-with-heart-eyes_1f60d.png',
  'robot.png': 'https://em-content.zobj.net/thumbs/240/apple/354/robot_1f916.png',
  
  // Success Page Emojis
  'party.png': 'https://em-content.zobj.net/thumbs/240/apple/354/party-popper_1f389.png',
  'sparkles.png': 'https://em-content.zobj.net/thumbs/240/apple/354/sparkles_2728.png',
  'money.png': 'https://em-content.zobj.net/thumbs/240/apple/354/money-bag_1f4b0.png',
  'star-struck.png': 'https://em-content.zobj.net/thumbs/240/apple/354/star-struck_1f929.png',
  
  // Failed Page Emojis
  'failed.png': 'https://em-content.zobj.net/thumbs/240/apple/354/face-with-diagonal-mouth_1fae4.png',
};

const downloadDir = path.join(__dirname, '../public/assets/emojis');

// Create directory if it doesn't exist
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
  console.log(`Created directory: ${downloadDir}`);
}

const downloadFile = (url, filename) => {
  const filePath = path.join(downloadDir, filename);
  
  // If file exists, skip (remove this check if you want to force update)
  if (fs.existsSync(filePath)) {
    return Promise.resolve();
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
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete partial file
      reject(err);
    });
  });
};

async function main() {
  console.log('🚀 Starting asset check & download...');
  const promises = Object.entries(assets).map(([filename, url]) => downloadFile(url, filename));
  
  try {
    await Promise.all(promises);
    console.log('✅ All assets are ready.');
  } catch (error) {
    console.error('❌ Error downloading assets:', error);
    process.exit(1);
  }
}

main();