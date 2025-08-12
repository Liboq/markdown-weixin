import { renderWeChatHtml } from '../dist/index.js'
import fs from 'fs'

// 基本功能测试
async function testBasic() {
  console.log('=== 基本功能测试 ===')

  const basicMarkdown = `# 标题一

## 标题二

这是一段普通文本，包含**粗体**和*斜体*。

> 这是一个引用块

- 列表项1
- 列表项2
- 列表项3

1. 有序列表1
2. 有序列表2`

  try {
    const result = await renderWeChatHtml(basicMarkdown,{embedCss:true})
    console.log('✅ 基本转换成功')
    console.log('HTML长度:', result.html.length)
    console.log('CSS长度:', result.css.length)
    return true
  } catch (error) {
    console.error('❌ 基本转换失败:', error)
    return false
  }
}

// 测试不同主题
async function testThemes() {
  console.log('\n=== 主题测试 ===')

  const markdown = '# 测试标题\n\n```javascript\nconsole.log("Hello World")\n```'

  const themes = [
    { pageTheme: 'default', typographyTheme: 'classic', codeTheme: 'github' },
    { pageTheme: 'narrow', typographyTheme: 'mo-di', codeTheme: 'tomorrow-night' },
    { pageTheme: 'wide', typographyTheme: 'classic', codeTheme: 'tomorrow-night-eighties' }
  ]

  for (let i = 0; i < themes.length; i++) {
    try {
      const result = await renderWeChatHtml(markdown, themes[i])
      console.log(`✅ 主题${i+1}转换成功:`, themes[i])
    } catch (error) {
      console.error(`❌ 主题${i+1}转换失败:`, themes[i], error)
    }
  }
}

// 测试特殊语法
async function testSpecialSyntax() {
  console.log('\n=== 特殊语法测试 ===')

  const specialMarkdown = `# 特殊语法测试

## 代码块
\`\`\`javascript
function hello() {
  console.log("Hello World")
  return true
}
\`\`\`

## 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
| 1   | 2   | 3   |

## 链接和图片
[Google](https://google.com)

## 删除线和任务列表
~~删除的文本~~

- [x] 已完成任务
- [ ] 未完成任务

## 脚注
这是一个脚注示例[^1]

[^1]: 这是脚注内容
`

  try {
    const result = await renderWeChatHtml(specialMarkdown)
    console.log('✅ 特殊语法转换成功')
    console.log('包含表格:', result.html.includes('<table>'))
    console.log('包含代码块:', result.html.includes('<pre>'))
    console.log('包含链接:', result.html.includes('<a '))
  } catch (error) {
    console.error('❌ 特殊语法转换失败:', error)
  }
}

// 测试输出选项
async function testOutputOptions() {
  console.log('\n=== 输出选项测试 ===')

  const markdown = '# 测试\n\n一些内容'

  // 测试 embedCss
  try {
    const result1 = await renderWeChatHtml(markdown, { embedCss: true })
    console.log('✅ embedCss选项测试成功')
    console.log('包含style标签:', result1.html.includes('<style>'))
  } catch (error) {
    console.error('❌ embedCss选项测试失败:', error)
  }

  // 测试 fullHtmlDocument
  try {
    const result2 = await renderWeChatHtml(markdown, { fullHtmlDocument: true })
    console.log('✅ fullHtmlDocument选项测试成功')
    console.log('包含完整HTML:', result2.fullHtml?.includes('<!doctype html>'))
  } catch (error) {
    console.error('❌ fullHtmlDocument选项测试失败:', error)
  }
}

// 测试行内样式（微信公众号模式）
async function testInlineStyles() {
  console.log('\n=== 行内样式测试（微信公众号模式） ===')

  const markdown = `# 标题一

## 标题二

这是一段**粗体**文本和*斜体*文本。

> 这是引用块

\`\`\`javascript
console.log("Hello World")
\`\`\`

- 列表项1
- 列表项2

| 列 | 表格 |
|---|------|
| A | B    |`

  try {
    const result = await renderWeChatHtml(markdown, { inlineStyles: true })
    console.log('✅ 行内样式转换成功',result.html)

    // 验证没有CSS类
    const hasClasses = result.html.includes('class=')
    console.log('不包含CSS类:', !hasClasses)

    // 验证包含行内样式
    const hasStyles = result.html.includes('style=')
    console.log('包含行内样式:', hasStyles)

    // 分析class使用情况
    if (hasClasses) {
      const classMatches = result.html.match(/class="[^"]*"/g) || []
      console.log('发现的class属性:', classMatches)
    }

    // 显示转换结果
    console.log('\n完整转换结果:')
    console.log(result.html)

  } catch (error) {
    console.error('❌ 行内样式转换失败:', error)
  }
}

// 运行所有测试
async function runAllTests() {
  console.log('开始运行 wx-md 测试...\n')

  await testBasic()
  await testThemes()
  await testSpecialSyntax()
  await testOutputOptions()
  await testInlineStyles()

  console.log('\n测试完成!')
}

runAllTests()
