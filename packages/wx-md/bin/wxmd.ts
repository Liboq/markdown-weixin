#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { renderWeChatHtml } from '../src/index.js';

function parseArgs(argv: string[]) {
  const args: Record<string, string|boolean> = {} as any;
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.split('=');
      (args as any)[k.replace(/^--/, '')] = v ?? true;
    } else if (!(args as any)._ ) {
      (args as any)._ = a;
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const inputPath = (args._ as string) || '';
  const pageTheme = (args['page'] as any) || 'wide';
  const codeTheme = (args['code'] as any) || 'tomorrow-night-eighties';
  const typography = (args['typo'] as any) || 'mo-di';
  const embedCss = Boolean(args['embed']);
  const full = Boolean(args['full']);
  const out = (args['out'] as string) || '';

  const md = inputPath ? fs.readFileSync(path.resolve(inputPath), 'utf8') : fs.readFileSync(0, 'utf8');

  const { html, css, fullHtml } = await renderWeChatHtml(md, {
    pageTheme,
    codeTheme,
    typographyTheme: typography,
    embedCss,
    fullHtmlDocument: full,
  } as any);

  const content = full ? (fullHtml as string) : (embedCss ? html : `<article class=\"wxmd-article\">${html}</article>`);

  if (out) {
    fs.writeFileSync(path.resolve(out), content, 'utf8');
  } else {
    process.stdout.write(content);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});