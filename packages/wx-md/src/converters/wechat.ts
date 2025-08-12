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
import { fileURLToPath } from 'node:url';

import type { RenderOptions, RenderResult, PageTheme, TypographyTheme, CodeTheme } from '../index.js';

// Resolve package root in both ESM and CJS outputs
const currentDir = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));
// From dist/converters back to package root
const pkgRoot = path.resolve(currentDir, '..');

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
  const useInlineStyles = options.inlineStyles ?? false;

  const css = [
    getPageCss(pageTheme),
    getTypographyCss(typographyTheme),
    getCodeCss(codeTheme)
  ].join('\n\n');

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
    .use(rehypeWeChatCompatible, useInlineStyles ? css : undefined)
    .use(rehypeStringify, { allowDangerousHtml: true });

  const file = await processor.process(markdown);
  const htmlBody = String(file);

  // 如果使用行内样式，不需要包装在 .wxmd-article 中
  const finalHtml = useInlineStyles ? htmlBody : htmlBody;

  if (options.fullHtmlDocument) {
    const styleSection = useInlineStyles ? '' : `<style>\n${css}\n</style>\n`;
    const articleWrapper = useInlineStyles ? finalHtml : `<article class="wxmd-article">${finalHtml}</article>`;
    const fullHtml = `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n${styleSection}</head>\n<body>\n${articleWrapper}\n</body>\n</html>`;
    return { html: finalHtml, css, fullHtml };
  }

  if (options.embedCss && !useInlineStyles) {
    const withStyle = `<style>\n${css}\n</style>\n<article class="wxmd-article">${finalHtml}</article>`;
    return { html: withStyle, css };
  }

  if (useInlineStyles) {
    // 行内样式模式下，直接返回带样式的HTML
    return { html: finalHtml, css };
  }

  return { html: finalHtml, css };
}
