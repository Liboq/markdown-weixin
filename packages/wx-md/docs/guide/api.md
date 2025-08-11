---
title: 编程调用 API
---

# 编程调用 API

在 Node.js 程序中使用：

```ts
import { convertMarkdownToWechatHtml } from 'wx-md'

const md = `# 标题\n\n一些内容...`
const html = await convertMarkdownToWechatHtml(md, {
  highlight: true,
  theme: {
    page: 'notebook',
    code: 'warm',
    typography: 'classic'
  }
})

console.log(html)
```

- `convertMarkdownToWechatHtml(markdown, options)` 返回字符串 HTML
- 主题名称按实际发布版本为准