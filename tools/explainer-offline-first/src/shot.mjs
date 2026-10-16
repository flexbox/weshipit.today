// Full-page screenshot of a static HTML page (directions.html).
// Usage: node src/shot.mjs directions.html out/directions.png
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [, , input, output] = process.argv;
const browser = await chromium.launch({ executablePath: chromium.executablePath() });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(resolve(input)).href);
await page.waitForFunction(() => window.directionsReady === true);
await page.screenshot({ path: resolve(output), fullPage: true });
await browser.close();
console.log(`wrote ${output}`);
