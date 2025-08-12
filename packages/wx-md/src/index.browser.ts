// 浏览器版本的入口文件，不包含 Node.js 依赖
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
  inlineStyles?: boolean;
}

export interface RenderResult {
  html: string;
  css: string;
  fullHtml?: string;
}

// 简单的 Markdown 转换实现（浏览器兼容）
function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown;
  
  // 标题
  html = html.replace(/^### (.*$)/gm, '<h3 style="color: #333; margin: 16px 0 8px 0; font-weight: bold;">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 style="color: #333; margin: 20px 0 10px 0; font-weight: bold; font-size: 1.3em;">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 style="color: #333; margin: 24px 0 12px 0; font-weight: bold; font-size: 1.5em;">$1</h1>');
  
  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre style="background: #f8f8f8; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0;"><code style="font-family: 'Fira Code', Consolas, monospace; font-size: 14px;">${code.trim()}</code></pre>`;
  });
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code style="background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; color: #d63384;">$1</code>');
  
  // 粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold; color: #333;">$1</strong>');
  
  // 斜体
  html = html.replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>');
  
  // 引用
  html = html.replace(/^> (.*$)/gm, '<blockquote style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid #0066cc; background: #f0f8ff; color: #333;">$1</blockquote>');
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #0066cc; text-decoration: underline;">$1</a>');
  
  // 列表
  html = html.replace(/^[\s]*[-*+] (.*$)/gm, '<li style="margin: 4px 0; padding-left: 8px;">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>)/s, '<ul style="margin: 12px 0; padding-left: 20px;">$1</ul>');
  
  // 段落
  html = html.replace(/\n\n/g, '</p><p style="margin: 12px 0; line-height: 1.6; color: #333;">');
  html = '<p style="margin: 12px 0; line-height: 1.6; color: #333;">' + html + '</p>';
  
  return html;
}

// 获取主题相关的样式
function getThemeStyles(options: RenderOptions) {
  let wrapperStyle = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 100%; padding: 16px;';
  
  // 页面主题
  switch (options.pageTheme) {
    case 'narrow':
      wrapperStyle += ' max-width: 600px; margin: 0 auto; background: #fafafa; border: 1px solid #e0e0e0; border-radius: 8px;';
      break;
    case 'wide':
      wrapperStyle += ' max-width: 900px; margin: 0 auto; background: #f9f9f9; padding: 24px;';
      break;
    default:
      wrapperStyle += ' max-width: 800px;';
  }
  
  // 排版主题
  if (options.typographyTheme === 'mo-di') {
    wrapperStyle += ' font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; letter-spacing: 0.5px;';
  }
  
  // 代码主题样式
  let codeStyle = 'background: #f8f8f8; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; font-family: "Fira Code", Consolas, monospace; font-size: 14px;';
  let inlineCodeStyle = 'background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; color: #d63384;';
  
  switch (options.codeTheme) {
    case 'tomorrow':
      codeStyle = 'background: #2d2d2d; color: #cccccc; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; font-family: "Fira Code", Consolas, monospace; font-size: 14px;';
      inlineCodeStyle = 'background: #3c3c3c; color: #f8f8f2; padding: 2px 6px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em;';
      break;
    case 'tomorrow-night':
      codeStyle = 'background: #1d1f21; color: #c5c8c6; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; font-family: "Fira Code", Consolas, monospace; font-size: 14px; border: 1px solid #444;';
      inlineCodeStyle = 'background: #282a2e; color: #c5c8c6; padding: 2px 6px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; border: 1px solid #444;';
      break;
    case 'tomorrow-night-blue':
      codeStyle = 'background: #002451; color: #ffffff; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; font-family: "Fira Code", Consolas, monospace; font-size: 14px; border: 1px solid #003d82;';
      inlineCodeStyle = 'background: #003d82; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; border: 1px solid #0056b3;';
      break;
    case 'tomorrow-night-bright':
      codeStyle = 'background: #000000; color: #eaeaea; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; font-family: "Fira Code", Consolas, monospace; font-size: 14px; border: 1px solid #333;';
      inlineCodeStyle = 'background: #1a1a1a; color: #eaeaea; padding: 2px 6px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; border: 1px solid #333;';
      break;
    case 'tomorrow-night-eighties':
      codeStyle = 'background: #2d2d2d; color: #cccccc; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; font-family: "Fira Code", Consolas, monospace; font-size: 14px; border: 1px solid #515151;';
      inlineCodeStyle = 'background: #515151; color: #cccccc; padding: 2px 6px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; border: 1px solid #747369;';
      break;
    case 'github':
      codeStyle = 'background: #f6f8fa; color: #24292f; border: 1px solid #d0d7de; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0; font-family: "Fira Code", Consolas, monospace; font-size: 14px;';
      inlineCodeStyle = 'background: #f3f4f6; color: #24292f; padding: 2px 4px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; border: 1px solid #d0d7de;';
      break;
  }
  
  return { wrapperStyle, codeStyle, inlineCodeStyle };
}

// 浏览器版本的转换函数
export function renderWeChatHtml(markdown: string, options: RenderOptions = {}): RenderResult {
  const { wrapperStyle, codeStyle, inlineCodeStyle } = getThemeStyles(options);
  
  let html = simpleMarkdownToHtml(markdown);
  
  // 更新代码块样式
  html = html.replace(/style="background: #f8f8f8; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 12px 0;"/g, `style="${codeStyle}"`);
  
  // 更新行内代码样式
  html = html.replace(/style="background: #f0f0f0; padding: 2px 4px; border-radius: 3px; font-family: Consolas, monospace; font-size: 0.9em; color: #d63384;"/g, `style="${inlineCodeStyle}"`);
  
  const wrappedHtml = `<div style="${wrapperStyle}">${html}</div>`;
  
  return {
    html: wrappedHtml,
    css: '',
    fullHtml: wrappedHtml
  };
}