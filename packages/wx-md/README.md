# wx-md

将 Markdown 转为适合微信公众号排版的 HTML，支持：
- 页面主题（default/narrow/wide）
- 代码主题（highlight.js 风格：github、tomorrow 系列等）
- 文字排版主题（内置“墨滴”与 classic）

## 安装

```
npm i wx-md
```

## 使用（Node API）

```ts
import { renderWeChatHtml } from 'wx-md';

const md = '# 标题\n\n一些内容...';
const { html, css, fullHtml } = await renderWeChatHtml(md, {
  pageTheme: 'wide',
  codeTheme: 'tomorrow-night-eighties',
  typographyTheme: 'mo-di',
  embedCss: true,
});
```

- embedCss: true 时，返回的 html 已内联样式，可直接粘贴到微信。
- fullHtmlDocument: true 时，同时返回完整 HTML 文档，便于预览或导出。

## CLI

```
# 从文件读取，内联样式并输出到 out.html
wxmd input.md --page=wide --code=tomorrow-night-eighties --typo=mo-di --embed --out=out.html

# 从 stdin 读取并输出到 stdout
cat input.md | wxmd --embed > out.html
```

## 注意
- 已内置 WeChat 兼容处理（如去除 li>p 包裹，图片响应式等）。
- 数学公式（remark-math）仅转为 HTML 结构，微信不渲染 LaTeX，建议转为图片或自行引入图片公式。