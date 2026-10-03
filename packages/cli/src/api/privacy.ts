import { homedir } from 'node:os'

const PATH_KEYS = new Set([
  'cwd',
  'sourceFile',
  'source_file',
  'path',
  'filePath',
  'projectPath',
  'directory',
  'workdir',
])

/** Strip home-directory and username prefixes from a local path. */
export function redactLocalPath(value: string): string {
  if (!value) return value
  const normalized = value.replace(/\\/g, '/')
  const home = homedir().replace(/\\/g, '/')
  let redacted = home && normalized.startsWith(home) ? `~${normalized.slice(home.length)}` : normalized
  redacted = redacted
    .replace(/^\/(?:Users|home|root)\/[^/]+/, '~')
    .replace(/^[A-Za-z]:\/Users\/[^/]+/i, '~')
  return redacted
}

export function redactSensitivePaths(data: unknown): unknown {
  if (Array.isArray(data)) return data.map(redactSensitivePaths)
  if (!data || typeof data !== 'object') return data
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (typeof value === 'string' && (PATH_KEYS.has(key) || looksLikeAbsolutePath(value))) {
      out[key] = redactLocalPath(value)
    } else {
      out[key] = redactSensitivePaths(value)
    }
  }
  return out
}

function looksLikeAbsolutePath(value: string): boolean {
  return value.startsWith('/') || /^[A-Za-z]:[\\/]/.test(value)
}
