const HTML_ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/g, '')
    .replace(/&[^;]+;/g, (entity) => HTML_ENTITY_MAP[entity] ?? '')
    .trim();
}
