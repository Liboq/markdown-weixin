---
title: 快速开始
---

# 快速开始

wx-md 是一个将 Markdown 转换为微信公众号友好 HTML 的工具，支持多种主题样式和在线预览。

## 📦 安装

```bash
# 全局安装（推荐）
npm install -g wx-md

# 或作为项目依赖
npm install wx-md --save-dev

# 使用 yarn
yarn global add wx-md
# 或
yarn add wx-md --dev
```

## 🚀 基础使用

### 命令行转换

将 Markdown 文件转换为 HTML：

```bash
# 基本转换
wxmd README.md -o output.html

# 指定主题
wxmd article.md -o output.html --page-theme narrow --code-theme tomorrow

# 启用内联样式（适合微信公众号）
wxmd article.md -o output.html --inline-styles
```

### 编程调用

```javascript
import { renderWeChatHtml } from 'wx-md'

const markdown = '# Hello World\n\n这是一个**测试**文档。'
const result = renderWeChatHtml(markdown, {
  pageTheme: 'narrow',
  codeTheme: 'github',
  typographyTheme: 'mo-di',
  inlineStyles: true
})

console.log(result.html)
```

## 🎨 主题配置

wx-md 支持多种主题组合：

### 页面主题
- `default` - 默认宽度
- `narrow` - 窄版面（适合移动端）
- `wide` - 宽版面

### 代码主题
- `github` - GitHub 风格
- `tomorrow` - Tomorrow 风格  
- `tomorrow-night` - Tomorrow 夜间主题
- `tomorrow-night-blue` - 蓝色夜间主题
- `tomorrow-night-bright` - 亮夜间主题
- `tomorrow-night-eighties` - 80年代风格

### 排版主题
- `classic` - 经典字体
- `mo-di` - 墨滴字体（中文优化）

## 💡 使用场景

### 微信公众号文章
```bash
# 生成适合微信公众号的 HTML
wxmd article.md -o wechat.html --page-theme narrow --inline-styles --typography-theme mo-di
```

### 技术博客
```bash
# 代码高亮的技术文章
wxmd tech-post.md -o blog.html --code-theme github --page-theme wide
```

### 暗色主题文档
```bash
# 使用暗色代码主题
wxmd docs.md -o dark.html --code-theme tomorrow-night --page-theme narrow
```

## 🌟 特性

- ✅ **微信公众号适配** - 内联样式，粘贴即用
- ✅ **多主题支持** - 页面、代码、排版主题自由组合
- ✅ **代码高亮** - 基于 highlight.js，支持多种语言
- ✅ **Markdown 扩展** - 支持 GFM、脚注、数学公式
- ✅ **响应式设计** - 移动端友好
- ✅ **在线预览** - 提供演示页面实时预览

## 📖 在线演示

访问 [在线演示](/demo) 页面体验：
- 实时 Markdown 编辑和预览
- 主题切换效果对比
- HTML 导出和下载功能

## 🔧 高级配置

### 完整选项示例

```javascript
const options = {
  pageTheme: 'narrow',           // 页面主题
  codeTheme: 'tomorrow-night',   // 代码主题  
  typographyTheme: 'mo-di',      // 排版主题
  inlineStyles: true,            // 内联样式
  embedCss: false,               // 嵌入 CSS
  fullHtmlDocument: true         // 完整 HTML 文档
}

const result = renderWeChatHtml(markdown, options)
```

### CI/CD 集成

```yaml
# GitHub Actions 示例
- name: Generate WeChat HTML
  run: |
    npm install -g wx-md
    wxmd docs/README.md -o dist/wechat-ready.html --inline-styles
```

## 📚 下一步

- 了解更多 [CLI 选项](/guide/cli)
- 查看 [API 文档](/guide/api)
- 探索 [主题系统](/guide/themes)
- 体验 [在线演示](/demo)