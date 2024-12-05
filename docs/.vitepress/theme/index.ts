import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ReturnLink from './components/ReturnLink.vue'
import SocialActions from './components/SocialActions.vue'
import Tooltip from './components/Tooltip.vue'
import { useNavigation } from './composables/useNavigation'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ReturnLink', ReturnLink)
    app.component('SocialActions', SocialActions)
    app.component('Tooltip', Tooltip)
  },
  setup() {
    useNavigation()
  }
}