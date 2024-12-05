import { getCurrentPath, extractPathAndHash, isSamePath } from './paths'
import { scrollToElement, updateHash } from './scroll'
import { setReturnState } from './state'
import { navigateToPath } from './navigation'

export const handleNavigation = (e: Event, link: HTMLAnchorElement, returnId: string): void => {
  e.preventDefault()
  
  const href = link.getAttribute('href') || ''
  const { path: targetPath, hash } = extractPathAndHash(href)
  const returnPath = getCurrentPath()
  
  console.log('🔗 handleNavigation:', {
    returnPath,
    targetPath,
    returnId,
    hash,
    href
  })
  
  // Store the return path before navigation
  setReturnState(returnPath, returnId)
  
  // Force ReturnLink components to update
  window.dispatchEvent(new Event('returnStateChanged'))
  
  // Check if we're navigating to the same page
  if (isSamePath(returnPath, targetPath)) {
    const targetElement = document.getElementById(hash)
    if (targetElement) {
      scrollToElement(targetElement)
      updateHash(hash)
    }
  } else {
    navigateToPath(targetPath, hash)
  }
}

export const setupClickHandler = (): ((e: Event) => void) => {
  return (e: Event) => {
    const target = e.target as HTMLElement
    const link = target.closest('a[data-return]') as HTMLAnchorElement | null
    
    if (!link) return
    
    const returnId = link.getAttribute('data-return')
    if (!returnId) return
    
    handleNavigation(e, link, returnId)
  }
}