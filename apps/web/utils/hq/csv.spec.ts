import { toCsv } from './csv';

describe('toCsv', () => {
  it('writes a header row and CRLF line endings', () => {
    expect(toCsv(['email', 'consent'], [['a@b.co', true]])).toBe(
      'email,consent\r\na@b.co,true',
    );
  });

  it('quotes cells with commas, quotes or line breaks', () => {
    expect(toCsv(['name'], [['Doe, "Jane"\nJr']])).toBe(
      'name\r\n"Doe, ""Jane""\nJr"',
    );
  });

  it('leaves empty cells for null and undefined', () => {
    expect(toCsv(['a', 'b'], [[null, undefined]])).toBe('a,b\r\n,');
  });

  it('neutralizes text that a spreadsheet would run as a formula', () => {
    expect(toCsv(['name'], [['=HYPERLINK("x")']])).toBe(
      `name\r\n"'=HYPERLINK(""x"")"`,
    );
    expect(toCsv(['n'], [[-3]])).toBe('n\r\n-3');
  });
});
