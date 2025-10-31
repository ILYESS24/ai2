/**
 * Script pour exécuter les tests Playwright
 * Utilise le binaire playwright directement
 */

const { spawn } = require('child_process');
const path = require('path');

const playwrightPath = path.join(__dirname, '../../node_modules/.bin/playwright');
const configPath = path.join(__dirname, 'playwright.config.examples.ts');

const args = process.argv.slice(2);
const testArgs = ['test', '--config', configPath, ...args];

console.log('Running Playwright tests...');
console.log('Command:', playwrightPath, testArgs.join(' '));

const proc = spawn(playwrightPath, testArgs, {
  stdio: 'inherit',
  shell: true,
  cwd: path.join(__dirname, '../..'),
});

proc.on('exit', (code) => {
  process.exit(code || 0);
});

proc.on('error', (err) => {
  console.error('Failed to start Playwright:', err);
  process.exit(1);
});

