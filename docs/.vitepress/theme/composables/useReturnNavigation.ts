import { ref, onMounted, watch } from 'vue'
import { useRoute, useData } from 'vitepress'
import { updateHash, scrollToElement } from '../utils/navigation'

export function useReturnNavigation() {
  const route = useRoute()
  const { page } = useData()
  const returnLink = ref(null)

  const updateReturnLink = () => {
    if (typeof window === 'undefined') return

    const returnId = window.sessionStorage.getItem('returnTo')
    if (returnId && returnLink.value) {
      returnLink.value.href = `#${returnId}`
    }
  }

  const handleReturnClick = (e: Event) => {
    if (typeof window === 'undefined') return
    
    e.preventDefault()
    const href = returnLink.value?.href
    
    if (href) {
      const targetId = href.split('#')[1]
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        scrollToElement(targetElement)
        updateHash(targetId)
        window.sessionStorage.removeItem('returnTo')
      }
    }
  }

  onMounted(() => {
    updateReturnLink()
    
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', updateReturnLink)
    }
  })

  watch(
    [() => route.path, () => route.hash, () => page.value],
    updateReturnLink,
    { deep: true }
  )

  return {
    returnLink,
    handleReturnClick
  }
}