const fs = require('fs');
const { execSync } = require('child_process');

// Remove node_modules
try {
  console.log('Removing node_modules...');
  fs.rmSync('./node_modules', { recursive: true, force: true });
} catch (err) {
  console.log('No node_modules folder found or error removing it.');
}

// Remove package-lock.json
try {
  console.log('Removing package-lock.json...');
  fs.unlinkSync('./package-lock.json');
} catch (err) {
  console.log('No package-lock.json found or error removing it.');
}

// Run npm install
console.log('Running npm install...');
execSync('npm install', { stdio: 'inherit' });

console.log('Dependencies reset successfully!');