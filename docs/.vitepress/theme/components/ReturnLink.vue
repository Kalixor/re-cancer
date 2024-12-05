<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import { scrollToElement, updateHash } from '../utils/scroll'
import { getReturnState, clearReturnState } from '../utils/state'
import { shouldResetLink, resetReturnLink, markForReset, needsReset } from '../utils/resetLink'
import { useReturnLinkVisibility } from '../composables/useReturnLinkVisibility'

const route = useRoute()
const returnLink = ref<HTMLAnchorElement | null>(null)
const { shouldShowReturnLink } = useReturnLinkVisibility()

const updateReturnLink = () => {
  if (typeof window === 'undefined') return
  
  const state = getReturnState()
  if (state && returnLink.value) {
    const { path, hash } = state
    returnLink.value.href = `${path}#${hash}`
    console.log('🔗 ReturnLink href updated:', returnLink.value.href)
  }
}

const handleReturnClick = async (e: Event) => {
  if (typeof window === 'undefined') return
  
  e.preventDefault()
  const state = getReturnState()
  
  if (state) {
    const { path, hash } = state
    console.log('🔗 ReturnLink clicked, navigating to:', `${path}#${hash}`)
    const targetElement = document.getElementById(hash)
    
    if (targetElement) {
      // Clear state before navigation
      clearReturnState()
      
      if (shouldResetLink(route.path)) {
        markForReset()
      }
      
      scrollToElement(targetElement)
      updateHash(hash)
    } else {
      clearReturnState()
      window.location.href = `${path}#${hash}`
    }
  }
}

// Watch for reset condition
watch(needsReset, (shouldReset) => {
  if (shouldReset && returnLink.value) {
    resetReturnLink(returnLink.value)
  }
}, { immediate: true })

onMounted(() => {
  updateReturnLink()
  
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', updateReturnLink)
    window.addEventListener('returnStateChanged', updateReturnLink)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('hashchange', updateReturnLink)
    window.removeEventListener('returnStateChanged', updateReturnLink)
  }
})
</script>

<template>
  <a 
    v-if="shouldShowReturnLink"
    ref="returnLink" 
    class="return-link" 
    href="#" 
    @click="handleReturnClick"
  >
    Retour
  </a>
</template>

<style scoped>
.return-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.return-link:hover {
  text-decoration: underline;
}
</style>