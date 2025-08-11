import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'wx-md 文档',
  description: '将 Markdown 转为适配微信公众号的 HTML，带页面、代码与排版主题',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      {
        text: '文档',
        items: [
          { text: '📘 指南', link: '/guide/getting-started' },
          { text: '🛠️ CLI', link: '/guide/cli' },
          { text: '🧩 API', link: '/guide/api' },
          { text: '🎨 主题', link: '/guide/themes' },
          { text: '❓ FAQ', link: '/faq' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/cnych/markdown-weixin' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '📘 指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '命令行 CLI', link: '/guide/cli' },
            { text: '编程调用 API', link: '/guide/api' },
            { text: '主题与样式', link: '/guide/themes' }
          ]
        }
      ],
      '/': [
        {
          text: '🗂️ 文档',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: 'FAQ', link: '/faq' }
          ]
        }
      ]
    },
    outline: 'deep',
    socialLinks: [{ icon: 'github', link: 'https://github.com/cnych/markdown-weixin' }],
    footer: { message: 'MIT Licensed', copyright: '© 2025 wx-md' }
  },
  vite: {
    server: { port: 5174 }
  }
})