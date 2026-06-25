#!/usr/bin/env node
/**
 * Capture README screenshots using system Chrome via puppeteer-core.
 */
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const showcasePath = path.join(__dirname, 'showcase.html');
const fileUrl = `file://${showcasePath}`;

const shots = [
  { selector: '#command-cockpit', file: 'command-cockpit.png' },
  { selector: '#components-showcase', file: 'components.png' },
  { selector: '#themes-showcase', file: 'themes.png' },
];

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/local/bin/google-chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 800));

for (const { selector, file } of shots) {
  const el = await page.$(selector);
  if (!el) throw new Error(`Missing selector: ${selector}`);
  await el.screenshot({ path: path.join(__dirname, file) });
  console.log(`Wrote ${file}`);
}

await browser.close();
