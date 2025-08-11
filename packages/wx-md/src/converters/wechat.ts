import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeWeChatCompatible from './rehype-wechat.js';

import fs from 'node:fs';
import path from 'node:path';

import type { RenderOptions, RenderResult, PageTheme, TypographyTheme, CodeTheme } from '../index.js';

const pkgRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');

function loadCss(relPath: string): string {
  const p = path.join(pkgRoot, 'src', relPath);
  return fs.readFileSync(p, 'utf8');
}

function getPageCss(theme: PageTheme): string {
  switch (theme) {
    case 'narrow':
      return loadCss('themes/page/narrow.css');
    case 'wide':
      return loadCss('themes/page/wide.css');
    default:
      return loadCss('themes/page/default.css');
  }
}

function getTypographyCss(theme: TypographyTheme): string {
  switch (theme) {
    case 'mo-di':
      return loadCss('themes/typography/mo-di.css');
    default:
      return loadCss('themes/typography/classic.css');
  }
}

function getCodeCss(theme: CodeTheme): string {
  switch (theme) {
    case 'github':
      return loadCss('themes/code/github.css');
    case 'tomorrow':
      return loadCss('themes/code/tomorrow.css');
    case 'tomorrow-night':
      return loadCss('themes/code/tomorrow-night.css');
    case 'tomorrow-night-blue':
      return loadCss('themes/code/tomorrow-night-blue.css');
    case 'tomorrow-night-bright':
      return loadCss('themes/code/tomorrow-night-bright.css');
    case 'tomorrow-night-eighties':
      return loadCss('themes/code/tomorrow-night-eighties.css');
    default:
      return loadCss('themes/code/github.css');
  }
}

export async function renderWeChatHtml(markdown: string, options: RenderOptions = {}): Promise<RenderResult> {
  const pageTheme = options.pageTheme ?? 'wide';
  const typographyTheme = options.typographyTheme ?? 'mo-di';
  const codeTheme = options.codeTheme ?? 'tomorrow-night-eighties';

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFootnotes, { inlineNotes: true })
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight)
    .use(rehypeWeChatCompatible)
    .use(rehypeStringify, { allowDangerousHtml: true });

  const file = await processor.process(markdown);
  const htmlBody = String(file);

  const css = [
    getPageCss(pageTheme),
    getTypographyCss(typographyTheme),
    getCodeCss(codeTheme)
  ].join('\n\n');

  if (options.fullHtmlDocument) {
    const fullHtml = `<!doctype html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<style>\n${css}\n</style>\n</head>\n<body>\n<article class=\"wxmd-article\">${htmlBody}</article>\n</body>\n</html>`;
    return { html: htmlBody, css, fullHtml };
  }

  if (options.embedCss) {
    const withStyle = `<style>\n${css}\n</style>\n<article class=\"wxmd-article\">${htmlBody}</article>`;
    return { html: withStyle, css };
  }

  return { html: htmlBody, css };
}