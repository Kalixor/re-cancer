import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { getReturnState } from '../utils/state'

export function useReturnLinkVisibility() {
  const route = useRoute()
  
  const isTerminologiePage = computed(() => {
    return route.path.includes('/terminologie')
  })
  
  const shouldShowReturnLink = computed(() => {
    if (!isTerminologiePage.value) return true
    return getReturnState() !== null
  })
  
  return {
    shouldShowReturnLink
  }
}