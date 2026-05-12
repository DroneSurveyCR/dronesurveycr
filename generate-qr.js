const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Daemon connection details
const machineId = '7456f8e5-1d13-4451-b31e-3dcf7a873181';
const vpsIp = '100.68.57.10';
const daemonPort = 37531;

// Create connection string for Happy Coder QR code
// Format: happy://[machineId]@[vps-endpoint]
const connectionString = `happy://${machineId}@${vpsIp}:${daemonPort}`;

console.log('Generating QR code for daemon reconnection...');
console.log(`Machine ID: ${machineId}`);
console.log(`Connection: ${connectionString}`);
console.log('');

// Generate QR code as PNG file
const outputPath = path.join(__dirname, 'daemon-qr.png');
QRCode.toFile(outputPath, connectionString, {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 0.95,
  width: 300,
}, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
    process.exit(1);
  }
  console.log(`✅ QR code generated: ${outputPath}`);
  console.log('');
  console.log('📱 Scan this QR code with Happy Coder on your phone to reconnect.');
  console.log(`   It encodes: ${connectionString}`);
});

// Also generate as SVG for viewing in text
const svgPath = path.join(__dirname, 'daemon-qr.svg');
QRCode.toString(connectionString, {
  errorCorrectionLevel: 'H',
  type: 'image/svg+xml',
  quality: 0.95,
  width: 300,
}, (err, qrSvg) => {
  if (err) {
    console.error('Error generating SVG:', err);
    return;
  }
  fs.writeFileSync(svgPath, qrSvg);
  console.log(`✅ SVG version: ${svgPath}`);
});
