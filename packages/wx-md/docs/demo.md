# 在线演示

使用 `vitepress-theme-demoblock` 插件来实时预览 wxmd 库的转换效果。

## 基础 Markdown 转换

:::demo 

```vue
<template>
  <div>
    <div class="demo-input">
      <h4>输入 Markdown:</h4>
      <textarea 
        v-model="markdown" 
        placeholder="输入 Markdown 内容..."
        rows="8"
        style="width: 100%; padding: 8px; font-family: monospace;"
      />
    </div>
    
    <div class="demo-output">
      <h4>转换后的 HTML:</h4>
      <div 
        class="wechat-preview" 
        v-html="convertedHtml"
        style="border: 1px solid #ddd; padding: 16px; background: #f9f9f9; min-height: 200px; overflow-y: auto;"
      />
    </div>
    
    <div class="demo-code">
      <h4>生成的 HTML 代码:</h4>
      <pre style="background: #f5f5f5; padding: 12px; overflow-x: auto; font-size: 12px;"><code>{{ convertedHtml }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

const wxmd = inject('wxmd')
const markdown = ref(`# 标题示例

这是一个**粗体文本**和*斜体文本*的示例。

## 代码块

\`\`\`javascript
function hello() {
  console.log('Hello, WeChat!')
}
\`\`\`

## 列表

- 项目 1
- 项目 2
- 项目 3

> 这是一个引用块
`)

const convertedHtml = computed(() => {
  try {
    if (wxmd && wxmd.renderWeChatHtml) {
      const result = wxmd.renderWeChatHtml(markdown.value, {
        inlineStyles: true
      })
      return result.html
    }
    return '<p>wxmd 库未正确加载</p>'
  } catch (error) {
    return `<p>转换错误: ${error.message}</p>`
  }
})
</script>

<style scoped>
.demo-input, .demo-output, .demo-code {
  margin: 16px 0;
}

.wechat-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

.wechat-preview h1, .wechat-preview h2, .wechat-preview h3 {
  color: #333;
  margin: 16px 0 8px 0;
}

.wechat-preview p {
  margin: 8px 0;
}

.wechat-preview code {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}

.wechat-preview pre {
  background: #f8f8f8;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
```

:::

## 主题切换演示

:::demo 

```vue
<template>
  <div>
    <div class="theme-selector">
      <label>选择主题组合: </label>
      <select v-model="selectedTheme" style="margin-left: 8px; padding: 4px;">
        <option value="default">默认主题</option>
        <option value="narrow-github">窄版面 + GitHub 代码</option>
        <option value="wide-tomorrow">宽版面 + Tomorrow 代码</option>
        <option value="wechat-style">微信样式 + 墨滴字体</option>
        <option value="dark-night">深色夜间主题</option>
        <option value="dark-blue">深蓝夜间主题</option>
        <option value="dark-bright">明亮夜间主题</option>
        <option value="retro-eighties">复古80年代主题</option>
      </select>
    </div>
    
    <div class="theme-preview">
      <div v-html="themedHtml" style="overflow-x: auto;" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'

const wxmd = inject('wxmd')
const selectedTheme = ref('default')

const sampleMarkdown = `# 主题演示

这段文本展示了不同主题的**样式效果**。

## 代码示例

\`\`\`javascript
const message = 'Hello World'
console.log(message)
\`\`\`

## 特性展示

- **粗体文本** 和 *斜体文本*
- \`行内代码\` 效果
- [链接样式](https://example.com)

> 这是引用文本，用来测试主题样式效果。`

const themedHtml = computed(() => {
  try {
    if (wxmd && wxmd.renderWeChatHtml) {
      const themeMap = {
        'default': { 
          pageTheme: 'default', 
          codeTheme: 'github' 
        },
        'narrow-github': { 
          pageTheme: 'narrow', 
          codeTheme: 'github' 
        },
        'wide-tomorrow': { 
          pageTheme: 'wide', 
          codeTheme: 'tomorrow' 
        },
        'wechat-style': { 
          pageTheme: 'narrow', 
          codeTheme: 'tomorrow', 
          typographyTheme: 'mo-di', 
          inlineStyles: true 
        },
        'dark-night': {
          pageTheme: 'narrow',
          codeTheme: 'tomorrow-night',
          typographyTheme: 'classic'
        },
        'dark-blue': {
          pageTheme: 'narrow',
          codeTheme: 'tomorrow-night-blue',
          typographyTheme: 'classic'
        },
        'dark-bright': {
          pageTheme: 'wide',
          codeTheme: 'tomorrow-night-bright',
          typographyTheme: 'classic'
        },
        'retro-eighties': {
          pageTheme: 'narrow',
          codeTheme: 'tomorrow-night-eighties',
          typographyTheme: 'mo-di'
        }
      }
      const options = themeMap[selectedTheme.value] || themeMap['default']
      const result = wxmd.renderWeChatHtml(sampleMarkdown, options)
      return result.html
    }
    return '<p style="color: #999;">wxmd 库未正确加载</p>'
  } catch (error) {
    return `<p style="color: #e74c3c;">转换错误: ${error.message}</p>`
  }
})
</script>

<style scoped>
.theme-selector {
  margin-bottom: 16px;
  padding: 12px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
}

.theme-preview {
  border: 1px solid #ddd;
  background: white;
  min-height: 300px;
  border-radius: 6px;
  overflow: hidden;
}
</style>
```

:::

## HTML 导出功能

:::demo 

```vue
<template>
  <div>
    <div class="export-controls">
      <div class="input-section">
        <label><strong>输入 Markdown:</strong></label>
        <textarea 
          v-model="exportMarkdown" 
          placeholder="输入要导出的 Markdown 内容..."
          rows="6"
          class="markdown-input"
        />
      </div>
      
      <div class="options-section">
        <label><strong>导出配置:</strong></label>
        <div class="option-row">
          <label>页面主题:</label>
          <select v-model="exportOptions.pageTheme" class="option-select">
            <option value="default">默认</option>
            <option value="narrow">窄版面</option>
            <option value="wide">宽版面</option>
          </select>
        </div>
        <div class="option-row">
          <label>代码主题:</label>
          <select v-model="exportOptions.codeTheme" class="option-select">
            <option value="github">GitHub</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="tomorrow-night">Tomorrow Night</option>
            <option value="tomorrow-night-blue">Tomorrow Night Blue</option>
            <option value="tomorrow-night-bright">Tomorrow Night Bright</option>
            <option value="tomorrow-night-eighties">Tomorrow Night Eighties</option>
          </select>
        </div>
        <div class="option-row">
          <label>排版主题:</label>
          <select v-model="exportOptions.typographyTheme" class="option-select">
            <option value="classic">经典</option>
            <option value="mo-di">墨滴</option>
          </select>
        </div>
        <div class="option-row">
          <label>
            <input type="checkbox" v-model="exportOptions.inlineStyles" />
            使用内联样式（适合微信公众号）
          </label>
        </div>
      </div>
    </div>
    
    <div class="export-actions">
      <button @click="generateHtml" class="generate-btn">生成 HTML</button>
      <button @click="copyHtml" class="copy-btn" :disabled="!generatedHtml">复制 HTML</button>
      <button @click="downloadHtml" class="download-btn" :disabled="!generatedHtml">下载文件</button>
    </div>
    
    <div v-if="generatedHtml" class="export-result">
      <div class="result-preview">
        <h4>预览效果:</h4>
        <div v-html="generatedHtml" class="html-preview" />
      </div>
      
      <div class="result-code">
        <h4>生成的 HTML 代码:</h4>
        <textarea 
          :value="generatedHtml" 
          readonly 
          rows="10" 
          class="html-output"
        />
      </div>
    </div>
    
    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const wxmd = inject('wxmd')

const exportMarkdown = ref(`# 导出示例

这是一个 **wxmd 库** 导出的示例文档。

## 功能特点

- 支持多种主题样式
- 内联样式适配微信公众号
- 代码高亮显示

\`\`\`javascript
function hello() {
  console.log('Hello, WeChat!')
}
\`\`\`

> 这是一个引用块，展示样式效果。

[访问项目主页](https://github.com/cnych/markdown-weixin)`)

const exportOptions = ref({
  pageTheme: 'narrow',
  codeTheme: 'github',
  typographyTheme: 'classic',
  inlineStyles: true
})

const generatedHtml = ref('')
const message = ref('')
const messageType = ref('')

function generateHtml() {
  try {
    if (wxmd && wxmd.renderWeChatHtml) {
      const result = wxmd.renderWeChatHtml(exportMarkdown.value, exportOptions.value)
      generatedHtml.value = result.html
      showMessage('HTML 生成成功！', 'success')
    } else {
      showMessage('wxmd 库未正确加载', 'error')
    }
  } catch (error) {
    showMessage(`生成失败: ${error.message}`, 'error')
  }
}

function copyHtml() {
  try {
    navigator.clipboard.writeText(generatedHtml.value)
    showMessage('HTML 已复制到剪贴板！', 'success')
  } catch (error) {
    showMessage('复制失败，请手动复制', 'error')
  }
}

function downloadHtml() {
  try {
    const blob = new Blob([generatedHtml.value], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wxmd-output.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showMessage('HTML 文件下载成功！', 'success')
  } catch (error) {
    showMessage(`下载失败: ${error.message}`, 'error')
  }
}

function showMessage(msg, type) {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>

<style scoped>
.export-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 16px;
}

.input-section, .options-section {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.markdown-input {
  width: 100%;
  padding: 8px;
  font-family: monospace;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 8px;
  resize: vertical;
}

.option-row {
  display: flex;
  align-items: center;
  margin: 8px 0;
  gap: 12px;
}

.option-select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.export-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.generate-btn, .copy-btn, .download-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.generate-btn {
  background: #007bff;
  color: white;
}

.generate-btn:hover {
  background: #0056b3;
}

.copy-btn {
  background: #28a745;
  color: white;
}

.copy-btn:hover:not(:disabled) {
  background: #1e7e34;
}

.download-btn {
  background: #17a2b8;
  color: white;
}

.download-btn:hover:not(:disabled) {
  background: #117a8b;
}

.copy-btn:disabled, .download-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.export-result {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.result-preview, .result-code {
  padding: 16px;
}

.result-preview {
  border-bottom: 1px solid #ddd;
  background: white;
}

.result-code {
  background: #f8f9fa;
}

.html-preview {
  border: 1px solid #eee;
  padding: 16px;
  background: white;
  max-height: 300px;
  overflow-y: auto;
}

.html-output {
  width: 100%;
  font-family: monospace;
  font-size: 12px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  resize: vertical;
}

.message {
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
  font-weight: bold;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .export-controls {
    grid-template-columns: 1fr;
  }
  
  .export-actions {
    flex-direction: column;
  }
}
</style>
```

:::
