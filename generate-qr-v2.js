const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const machineId = '7456f8e5-1d13-4451-b31e-3dcf7a873181';

// Try different QR code formats
const formats = [
  { name: 'machine-id-only', data: machineId },
  { name: 'happycloud-discovery', data: `https://api.cluster-fluster.com/machines/${machineId}` },
  { name: 'happy-protocol-simple', data: `happy://${machineId}` },
  { name: 'machine-uri', data: `machine://${machineId}` },
];

console.log('Generating multiple QR code formats...\n');

formats.forEach((format) => {
  const outputPath = path.join(__dirname, `qr-${format.name}.png`);
  const data = format.data;

  console.log(`Format: ${format.name}`);
  console.log(`Encodes: ${data}`);

  QRCode.toFile(outputPath, data, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.95,
    width: 300,
  }, (err) => {
    if (err) {
      console.error(`  ❌ Error: ${err.message}`);
    } else {
      console.log(`  ✅ Generated: ${path.basename(outputPath)}`);
    }
  });
  console.log('');
});

console.log('Test each QR code format by scanning with Happy Coder on your phone.');
console.log('The format that works is the correct one for your daemon.');
