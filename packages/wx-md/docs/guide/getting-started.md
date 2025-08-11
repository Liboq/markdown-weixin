---
title: 快速开始
---

# 快速开始

安装（全局或项目内）：

```bash
# 全局安装（可直接使用命令 wxmd）
npm i -g wx-md

# 或作为开发依赖
npm i -D wx-md
```

将 `README.md` 转为 HTML：

```bash
wxmd README.md -o output.html
```

- 默认会启用 GFM、脚注、公式、代码高亮等常用增强
- 输出 HTML 适配微信公众号「粘贴即用」，减少额外排版成本

在 CI 脚本里使用：

```bash
wxmd docs/article.md -o dist/article.html
```

下一步：查看「[CLI](/guide/cli)」或「[API](/guide/api)」。