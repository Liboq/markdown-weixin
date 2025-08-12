import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import NotebookDecor from './components/NotebookDecor.vue'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
import './styles.css'
// 导入 wxmd 库用于预览 - 使用浏览器兼容版本
import * as wxmd from '../../../src/index.browser'

export default {
  extends:DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(NotebookDecor)
    })
  },
  enhanceApp(ctx) {
    useComponents(ctx.app)
    // 将 wxmd 库挂载到全局，供演示组件使用
    ctx.app.config.globalProperties.$wxmd = wxmd
    // 也可以通过 provide/inject 方式提供
    ctx.app.provide('wxmd', wxmd)
  }
}
