import { extractPathAndHash, isSamePath } from './paths'
import { scrollToElement, updateHash } from './scroll'
import { setReturnState } from './state'

const handleSamePageNavigation = (hash: string) => {
  const targetElement = document.getElementById(hash)
  if (targetElement) {
    scrollToElement(targetElement)
    updateHash(hash)
  }
}

const handleCrossPageNavigation = (path: string, hash: string) => {
  const url = `${path}${hash ? '#' + hash : ''}`
  window.location.href = url
}

export const handleNavigationClick = (e: Event, currentPath: string) => {
  const link = (e.target as HTMLElement).closest('a[data-return]') as HTMLAnchorElement | null
  if (!link) return
  
  const returnId = link.getAttribute('data-return')
  if (!returnId) return
  
  e.preventDefault()
  
  const href = link.getAttribute('href') || ''
  const { path: targetPath, hash } = extractPathAndHash(href)
  
  // Store both the current path and the specific return ID
  setReturnState(currentPath, returnId)
  window.dispatchEvent(new Event('returnStateChanged'))
  
  if (isSamePath(currentPath, targetPath)) {
    handleSamePageNavigation(hash)
  } else {
    handleCrossPageNavigation(targetPath, hash)
  }
}