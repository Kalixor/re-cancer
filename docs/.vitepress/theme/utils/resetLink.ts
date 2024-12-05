import { ref } from 'vue'

const shouldReset = ref(false)

export const shouldResetLink = (path: string): boolean => {
  return path.includes('/terminologie')
}

export const resetReturnLink = (element: HTMLAnchorElement | null): void => {
  if (!element) return
  
  element.href = '#'
  shouldReset.value = false
  console.log('🔄 ReturnLink reset to #')
}

export const markForReset = (): void => {
  shouldReset.value = true
  console.log('🎯 ReturnLink marked for reset')
}

export const needsReset = (): boolean => {
  return shouldReset.value
}