import { ref } from 'vue'

interface ReturnState {
  path: string
  hash: string
}

const returnState = ref<ReturnState | null>(null)

export const getReturnState = (): ReturnState | null => {
  // First try to get from memory
  if (returnState.value) {
    return returnState.value
  }
  
  // Fallback to session storage
  if (typeof window === 'undefined') return null
  
  const stored = window.sessionStorage.getItem('returnTo')
  if (!stored) return null
  
  try {
    const state = JSON.parse(stored)
    returnState.value = state // Update memory state
    return state
  } catch {
    return null
  }
}

export const setReturnState = (path: string, hash: string): void => {
  const state = { path, hash }
  
  // Update both memory and storage
  returnState.value = state
  
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem('returnTo', JSON.stringify(state))
  }
  
  console.log('💾 Return state saved:', state)
}

export const clearReturnState = (): void => {
  // Clear both memory and storage
  returnState.value = null
  
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem('returnTo')
  }
  
  console.log('🧹 Return state cleared')
}