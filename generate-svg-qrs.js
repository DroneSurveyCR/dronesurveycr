const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const machineId = '7456f8e5-1d13-4451-b31e-3dcf7a873181';

const formats = [
  { name: 'machine-id-only', data: machineId },
  { name: 'happycloud-discovery', data: `https://api.cluster-fluster.com/machines/${machineId}` },
  { name: 'happy-protocol-simple', data: `happy://${machineId}` },
  { name: 'machine-uri', data: `machine://${machineId}` },
];

formats.forEach((format) => {
  QRCode.toString(format.data, {
    errorCorrectionLevel: 'H',
    type: 'image/svg+xml',
    width: 10,
  }, (err, qr) => {
    if (err) {
      console.error(`Error for ${format.name}:`, err);
      return;
    }
    const outputPath = path.join(__dirname, `qr-${format.name}.svg`);
    fs.writeFileSync(outputPath, qr);
    console.log(`✅ ${format.name}: ${path.basename(outputPath)}`);
  });
});
