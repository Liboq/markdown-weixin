---
title: 主题与样式
---

# 主题与样式

wx-md 提供页面、代码高亮与排版三个层面的主题。建议在输出 HTML 后，按需注入对应 CSS。

本网站采用了「手绘笔记本」视觉：

- 米色纸张底色、蓝色辅助线、左侧红色边距线、纸张孔洞
- 白色内容卡片 + 浅灰边框，阅读友好

你可以在自己的文章容器上复用类似样式：

```css
.article-card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 24px;
}
```