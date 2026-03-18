import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distRoot = path.resolve(__dirname, '../dist');

const shouldRewrite = (filePath) =>
  filePath.endsWith('.js') ||
  filePath.endsWith('.d.ts') ||
  filePath.endsWith('.mjs') ||
  filePath.endsWith('.cjs');

const rewriteImports = (source) =>
  source.replaceAll('@ds/', '@snappin/design-system/');

const walk = async (dirPath) => {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (!shouldRewrite(fullPath)) continue;

    const source = await readFile(fullPath, 'utf8');
    const rewritten = rewriteImports(source);

    if (rewritten !== source) {
      await writeFile(fullPath, rewritten, 'utf8');
    }
  }
};

await walk(distRoot);
