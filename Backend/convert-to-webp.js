const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputRoot = path.join(__dirname, '../microcode-software/public/static/img');

function convertFolder(folderPath) {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      convertFolder(fullPath); // Recurse into subfolder
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputFilePath = path.join(
          folderPath,
          path.basename(file, ext) + '.webp'
        );

        sharp(fullPath)
          .resize(800) // Optional resize
          .webp({ quality: 80 })
          .toFile(outputFilePath)
          .then(() => console.log(`✅ Converted: ${file}`))
          .catch(err => console.error(`❌ Error converting ${file}:`, err));
      }
    }
  });
}

convertFolder(inputRoot);
