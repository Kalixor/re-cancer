import { onMounted, onUnmounted } from 'vue'
import { handleNavigationClick } from '../utils/navigationHandlers'
import { useCurrentPath } from './useCurrentPath'

export function useNavigation() {
  const { currentPath } = useCurrentPath()
  
  const handleClick = (e: Event) => {
    handleNavigationClick(e, currentPath.value)
  }

  onMounted(() => {
    document.addEventListener('click', handleClick, { capture: true })
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClick, { capture: true })
  })
}