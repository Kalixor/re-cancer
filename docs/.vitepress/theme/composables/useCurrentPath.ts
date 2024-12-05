import { ref, watch } from 'vue'
import { useRoute } from 'vitepress'

export function useCurrentPath() {
  const route = useRoute()
  const currentPath = ref(route.path)

  watch(() => route.path, (newPath) => {
    currentPath.value = newPath
  })

  return {
    currentPath
  }
}