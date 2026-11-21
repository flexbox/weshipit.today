export type CsvCell = string | number | boolean | null | undefined;

/**
 * Cells starting with these characters run as formulas when the file is
 * opened in a spreadsheet. A visitor controls their first name, so prefix them.
 */
const FORMULA_START = /^[=+\-@\t\r]/;

function escapeCell(cell: CsvCell): string {
  if (cell === null || cell === undefined) return '';
  let value = String(cell);
  if (typeof cell === 'string' && FORMULA_START.test(value)) {
    value = `'${value}`;
  }
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** RFC 4180 CSV with CRLF line endings. */
export function toCsv(headers: string[], rows: CsvCell[][]): string {
  return [headers, ...rows]
    .map((row) => row.map(escapeCell).join(','))
    .join('\r\n');
}
