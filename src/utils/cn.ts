/**
 * Minimal className helper for `@/utils/cn` path alias usage in components.
 */
export function cn(...parts: Array<string | undefined | null | false>): string {
  return parts.filter(Boolean).join(' ');
}
