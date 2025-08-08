export type PageTheme = 'default' | 'narrow' | 'wide';
export type TypographyTheme = 'mo-di' | 'classic';
export type CodeTheme =
  | 'github'
  | 'tomorrow'
  | 'tomorrow-night'
  | 'tomorrow-night-blue'
  | 'tomorrow-night-bright'
  | 'tomorrow-night-eighties';

export interface RenderOptions {
  pageTheme?: PageTheme;
  typographyTheme?: TypographyTheme;
  codeTheme?: CodeTheme;
  embedCss?: boolean;
  fullHtmlDocument?: boolean;
}

export interface RenderResult {
  html: string;
  css: string;
  fullHtml?: string;
}

import { renderWeChatHtml } from './converters/wechat.js';
export { renderWeChatHtml };