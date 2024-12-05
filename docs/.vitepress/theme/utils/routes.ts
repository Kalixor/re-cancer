import { useRoute } from 'vitepress'

export const normalizeRoutePath = (path: string): string => {
  // Remove leading and trailing slashes
  let normalized = path.replace(/^\/|\/$/g, '')
  
  // Add .html extension if not present
  if (!normalized.endsWith('.html')) {
    normalized = `${normalized}.html`
  }
  
  // Ensure path starts with /
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`
  }
  
  return normalized
}

export const getCurrentRoutePath = (): string => {
  const route = useRoute()
  return normalizeRoutePath(route.path)
}

export const parseRoute = (href: string): { path: string; hash: string } => {
  const [pathPart = '', hashPart = ''] = href.split('#')
  const normalizedPath = normalizeRoutePath(pathPart || getCurrentRoutePath())
  
  return {
    path: normalizedPath,
    hash: hashPart
  }
}