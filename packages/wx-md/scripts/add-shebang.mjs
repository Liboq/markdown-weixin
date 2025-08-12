import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const binOut = resolve(process.cwd(), 'dist/wxmd.js');

// Ensure dist/bin exists if tsup did not create it (tsup will for bin entry)
mkdirSync(dirname(binOut), { recursive: true });

let content = '';
try {
  content = readFileSync(binOut, 'utf8');
} catch (err) {
  console.error('Cannot read built bin file at', binOut, err);
  process.exit(1);
}

const shebang = '#!/usr/bin/env node\n';
if (!content.startsWith(shebang)) {
  writeFileSync(binOut, shebang + content, 'utf8');
  console.log('Shebang added to', binOut);
} else {
  console.log('Shebang already present in', binOut);
}


