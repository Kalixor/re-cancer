import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import { normalizePath } from './paths'

const previousPath = ref<string>('')
const currentPath = ref<string>('')

export const useRouteTracker = () => {
  const route = useRoute()
  
  onMounted(() => {
    currentPath.value = normalizePath(route.path)
  })
  
  watch(() => route.path, (newPath) => {
    previousPath.value = currentPath.value
    currentPath.value = normalizePath(newPath)
  })
  
  return {
    previousPath,
    currentPath
  }
}