import { conversionForUrl } from './analytics';

describe('conversionForUrl', () => {
  it('maps cal.com links to a booked call with the calendar slug', () => {
    expect(conversionForUrl('https://cal.com/davidl/coaching')).toEqual({
      event: 'book_call_clicked',
      properties: { calendar: 'coaching' },
    });
  });

  it('maps Stripe payment links to a checkout', () => {
    expect(
      conversionForUrl('https://buy.stripe.com/5kA03G1sz8wu8GkfZ6'),
    ).toEqual({
      event: 'checkout_clicked',
      properties: { product: 'stripe_5kA03G1sz8wu8GkfZ6' },
    });
  });

  it('maps Gumroad links, with or without a creator subdomain', () => {
    expect(
      conversionForUrl('https://flexbox.gumroad.com/l/expo-checklist'),
    ).toEqual({
      event: 'checkout_clicked',
      properties: { product: 'gumroad_expo-checklist' },
    });
    expect(conversionForUrl('https://gumroad.com/l/road-react-native')).toEqual(
      {
        event: 'checkout_clicked',
        properties: { product: 'gumroad_road-react-native' },
      },
    );
  });

  it('ignores every other link', () => {
    expect(conversionForUrl('https://weshipit.today/pricing')).toBeNull();
    expect(conversionForUrl('https://github.com/flexbox')).toBeNull();
    expect(conversionForUrl('not a url')).toBeNull();
  });
});
