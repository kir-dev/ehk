
export function lexicalToPlainText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as { root?: unknown }).root
  return collectText(root)
}

function collectText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: unknown; children?: unknown }
  let out = ''
  if (typeof n.text === 'string') out += n.text + ' '
  const children = Array.isArray(n.children) ? n.children : []
  for (const child of children) out += collectText(child)
  return out
}

export function getReadingTimeFromRichText(data: unknown): number {
  const text = lexicalToPlainText(data)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function formatBytes(bytes?: number | null): string | null {
  if (!bytes || bytes <= 0) return null
  const units = ["B", "KB", "MB", "GB", "TB"]
  let i = 0
  let val = bytes
  while (val >= 1024 && i < units.length - 1) {
    val = val / 1024
    i++
  }
  return `${val.toFixed(val >= 10 || i === 0 ? 0 : 1)} ${units[i]}`
}

export function translateTags(tags: string[] | undefined, lang: string): string[] {
  if (!tags) return []
  // This is a placeholder since the original translateTags was imported from @/lib/utils
  // but we are creating a dedicated utils file. If translateTags is generic, 
  // we should import it here or just import it directly in components.
  // Checking original code: it was imported from @/lib/utils.
  // So we don't need to copy it here, just use it from @/lib/utils in components.
  return [] 
}
