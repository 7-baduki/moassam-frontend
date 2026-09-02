const HTML_ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

function decodeEntity(entity: string): string {
  if (entity in HTML_ENTITY_MAP) return HTML_ENTITY_MAP[entity];

  const decimalMatch = entity.match(/^&#(\d+);$/);
  if (decimalMatch) return String.fromCodePoint(Number(decimalMatch[1]));

  const hexMatch = entity.match(/^&#x([0-9a-fA-F]+);$/i);
  if (hexMatch) return String.fromCodePoint(parseInt(hexMatch[1], 16));

  return '';
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/g, '')
    .replace(/&[^;]+;/g, decodeEntity)
    .trim();
}
