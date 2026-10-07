const { execSync } = require('child_process');

console.log('--- Generating Sitemap ---');
require('./sitemap.js');

console.log('--- Building React Application (CI=false) ---');
try {
  execSync('npx react-scripts build', {
    stdio: 'inherit',
    env: { ...process.env, CI: 'false' },
  });
} catch (error) {
  process.exit(1);
}

