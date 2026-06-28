import { AIRTABLE_FORM } from '~/utils/airtable-links';

describe('Airtable', () => {
  it('embeded forms should have the https://airtable.com/embed/xxxxxxxxx format ', () => {
    Object.keys(AIRTABLE_FORM).filter((key) => {
      expect(AIRTABLE_FORM[key]).toMatch(/^https:\/\/airtable\.com\/embed\//);
    });
  });
});
