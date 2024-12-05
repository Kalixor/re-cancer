export const scrollToElement = (element: HTMLElement): void => {
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth' })
}

export const updateHash = (hash: string): void => {
  if (typeof window === 'undefined') return
  window.location.hash = hash.startsWith('#') ? hash : `#${hash}`
}