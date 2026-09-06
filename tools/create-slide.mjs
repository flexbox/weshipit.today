#!/usr/bin/env node
/**
 * Scaffold a new remark.js slideshow in apps/davidl-fr/public/courses
 * from template.html + template.md.
 *
 *   yarn davidl-fr:slide
 *   yarn davidl-fr:slide offline-first
 */
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { copyFile, readFile, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const COURSES_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'apps',
  'davidl-fr',
  'public',
  'courses',
);

const slugify = (input) =>
  input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const exists = async (path) =>
  access(path).then(
    () => true,
    () => false,
  );

const askName = async () => {
  const [fromArgv] = process.argv.slice(2);
  if (fromArgv) return fromArgv;

  const rl = createInterface({ input: stdin, output: stdout });
  try {
    return await rl.question('Slideshow name (e.g. offline-first): ');
  } finally {
    rl.close();
  }
};

const main = async () => {
  const name = slugify(await askName());

  if (!name) {
    console.error('✖ A name is required.');
    process.exit(1);
  }

  const html = join(COURSES_DIR, `${name}.html`);
  const markdown = join(COURSES_DIR, `${name}.md`);

  for (const file of [html, markdown]) {
    if (await exists(file)) {
      console.error(`✖ ${file} already exists.`);
      process.exit(1);
    }
  }

  // slideshow.js derives the .md url from the .html filename, so both must match
  await copyFile(join(COURSES_DIR, 'template.md'), markdown);

  const template = await readFile(join(COURSES_DIR, 'template.html'), 'utf8');
  await writeFile(
    html,
    template.replace('<title>Template</title>', `<title>${name}</title>`),
  );

  console.log(`✔ Created apps/davidl-fr/public/courses/${name}.html`);
  console.log(`✔ Created apps/davidl-fr/public/courses/${name}.md`);
  console.log('');
  console.log('Next:');
  console.log(`  1. Write your slides in ${name}.md`);
  console.log(
    `  2. Add it to coursesList in apps/davidl-fr/src/pages/courses/index.tsx`,
  );
  console.log(
    `  3. yarn davidl-fr:start → http://localhost:4400/courses/${name}.html`,
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
