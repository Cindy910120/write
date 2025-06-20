// checkVersions.js
const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

console.log('=== Package Versions ===');
console.log('Nuxt:', packageJson.dependencies.nuxt);
console.log('Vue:', packageJson.dependencies.vue);
console.log('TailwindCSS:', packageJson.devDependencies.tailwindcss);
console.log('PostCSS:', packageJson.devDependencies.postcss);
console.log('@tailwindcss/postcss:', packageJson.devDependencies['@tailwindcss/postcss']);
console.log('Autoprefixer:', packageJson.devDependencies.autoprefixer);
