import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import NotebookDecor from './components/NotebookDecor.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(NotebookDecor)
    })
  }
}