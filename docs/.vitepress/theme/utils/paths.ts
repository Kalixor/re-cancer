export const isExternalPath = (path: string): boolean => {
  return path.startsWith('http://') || path.startsWith('https://')
}

export const normalizePath = (path: string): string => {
  let normalized = path
  if (!normalized.endsWith('.html')) {
    normalized = normalized.replace(/\/$/, '') + '.html'
  }
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized
  }
  return normalized
}

export const isSamePath = (path1: string, path2: string): boolean => {
  const norm1 = normalizePath(path1)
  const norm2 = normalizePath(path2)
  return norm1 === norm2
}

export const extractPathAndHash = (href: string): { path: string; hash: string } => {
  if (!href) return { path: '', hash: '' }
  if (isExternalPath(href)) return { path: href, hash: '' }

  const [pathPart = '', hashPart = ''] = href.split('#')
  const normalizedPath = pathPart ? normalizePath(pathPart) : ''
  return { path: normalizedPath, hash: hashPart }
}