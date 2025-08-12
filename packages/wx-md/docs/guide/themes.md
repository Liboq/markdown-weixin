---
title: 主题与样式
---

# 主题与样式

wx-md 提供页面、代码高亮与排版三个层面的主题系统，支持灵活组合使用。

## 🎨 主题系统概览

wx-md 的主题系统分为三个层面：

- **页面主题**: 控制整体布局和版面宽度
- **代码主题**: 控制代码块和行内代码的样式
- **排版主题**: 控制字体和文字排版

## 📄 页面主题

### default - 默认主题
- 标准宽度版面
- 适合大多数场景

### narrow - 窄版面主题  
- 最大宽度 600px
- 移动端友好
- 微信公众号推荐使用
- 带边框和背景色

### wide - 宽版面主题
- 最大宽度 900px
- 适合桌面端阅读
- 代码展示友好

## 💻 代码主题

### 明亮主题

#### github - GitHub 风格
```javascript
// 清爽的白色背景，蓝灰色边框
const message = 'Hello World'
```

#### tomorrow - Tomorrow 风格
```javascript  
// 深灰色背景，浅色文字
const message = 'Hello World'
```

### 暗色主题

#### tomorrow-night - 经典夜间
```javascript
// 深色背景 (#1d1f21)，经典配色
const message = 'Hello World'
```

#### tomorrow-night-blue - 蓝色夜间
```javascript
// 深蓝背景 (#002451)，专业感强
const message = 'Hello World'  
```

#### tomorrow-night-bright - 明亮夜间
```javascript
// 纯黑背景 (#000000)，高对比度
const message = 'Hello World'
```

#### tomorrow-night-eighties - 80年代复古
```javascript
// 复古灰色背景，怀旧配色
const message = 'Hello World'
```

## ✍️ 排版主题

### classic - 经典字体
- 使用系统默认无衬线字体
- 适合技术文档

### mo-di - 墨滴字体
- 针对中文优化
- 使用 PingFang SC、微软雅黑等
- 微信公众号推荐
- 增加字间距提升可读性

## 🚀 使用示例

### 命令行使用

```bash
# 微信公众号推荐配置
wxmd article.md -o wechat.html \
  --page-theme narrow \
  --code-theme tomorrow \
  --typography-theme mo-di \
  --inline-styles

# 技术博客配置
wxmd tech.md -o blog.html \
  --page-theme wide \
  --code-theme github \
  --typography-theme classic

# 深色主题配置
wxmd docs.md -o dark.html \
  --page-theme narrow \
  --code-theme tomorrow-night \
  --typography-theme classic
```

### 编程调用

```javascript
import { renderWeChatHtml } from 'wx-md'

// 微信公众号样式
const wechatResult = renderWeChatHtml(markdown, {
  pageTheme: 'narrow',
  codeTheme: 'tomorrow',
  typographyTheme: 'mo-di',
  inlineStyles: true
})

// 深色夜间主题
const darkResult = renderWeChatHtml(markdown, {
  pageTheme: 'narrow',
  codeTheme: 'tomorrow-night',
  typographyTheme: 'classic'
})

// 宽版面 + 蓝色夜间主题
const blueResult = renderWeChatHtml(markdown, {
  pageTheme: 'wide',
  codeTheme: 'tomorrow-night-blue',
  typographyTheme: 'classic'
})
```

## 🎯 主题推荐

### 微信公众号
```javascript
{
  pageTheme: 'narrow',
  codeTheme: 'tomorrow',
  typographyTheme: 'mo-di',
  inlineStyles: true
}
```

### 技术博客
```javascript
{
  pageTheme: 'wide',
  codeTheme: 'github', 
  typographyTheme: 'classic'
}
```

### 深色文档
```javascript
{
  pageTheme: 'narrow',
  codeTheme: 'tomorrow-night',
  typographyTheme: 'classic'
}
```

### 复古风格
```javascript  
{
  pageTheme: 'narrow',
  codeTheme: 'tomorrow-night-eighties',
  typographyTheme: 'mo-di'
}
```

## 🌟 在线预览

访问 [演示页面](/demo) 实时体验不同主题效果：
- 8+ 种预设主题组合
- 实时切换对比
- 导出功能测试

## 🎨 自定义样式

本文档网站采用「手绘笔记本」主题：

```css
.notebook-container {
  background: #f5f1e8; /* 米色纸张 */
  border-left: 3px solid #e74c3c; /* 红色边距线 */
}

.content-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

你可以基于 wx-md 的输出 HTML，添加自己的样式层。