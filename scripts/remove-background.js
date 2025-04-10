const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Path to the images
const inputPath = path.join(__dirname, '../public/images/az-900.png');
const outputPath = path.join(__dirname, '../public/images/az-900-transparent.png');

console.log('Starting background removal process...');
console.log('Input path:', inputPath);
console.log('Output path:', outputPath);

async function removeBackground() {
  try {
    // Simpler approach: use the alpha channel from a png
    await sharp(inputPath)
      .png()
      // Remove white background (threshold controls sensitivity, higher = more transparent pixels)
      .removeAlpha()
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toColourspace('srgb')
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        console.log('Processing image...', info.width, 'x', info.height);
        
        // Create a new buffer with transparency where white pixels were
        const newData = Buffer.alloc(data.length);
        let pixelsProcessed = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          // Check if the pixel is white or near white (RGB values all close to 255)
          if (data[i] > 230 && data[i + 1] > 230 && data[i + 2] > 230) {
            // Make it transparent
            newData[i] = data[i];       // R
            newData[i + 1] = data[i+1]; // G
            newData[i + 2] = data[i+2]; // B
            newData[i + 3] = 0;         // A (transparent)
            pixelsProcessed++;
          } else {
            // Keep the original color
            newData[i] = data[i];       // R
            newData[i + 1] = data[i+1]; // G
            newData[i + 2] = data[i+2]; // B
            newData[i + 3] = 255;       // A (fully opaque)
          }
        }
        
        console.log(`Made ${pixelsProcessed} pixels transparent`);
        
        // Create new image from the modified data
        return sharp(newData, {
          raw: {
            width: info.width,
            height: info.height,
            channels: 4
          }
        })
        .png()
        .toFile(outputPath)
        .then(() => {
          console.log('File saved successfully to:', outputPath);
        });
      });
      
    console.log('Background removal process completed!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

await removeBackground().catch(err => console.error('Top level error:', err));
