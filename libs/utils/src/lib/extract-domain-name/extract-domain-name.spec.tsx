import extractDomainName from './extract-domain-name';

describe('extractDomainName', () => {
  it('should return `null` if the input is `null`', () => {
    const result = extractDomainName(null);
    expect(result).toBeNull();
  });

  it('should remove "http://" from the beginning of a URL', () => {
    const result = extractDomainName('http://expo.dev');
    expect(result).toEqual('expo.dev');
  });

  it('should remove "https://" from the beginning of a URL', () => {
    const result = extractDomainName('https://example.com');
    expect(result).toEqual('example.com');
  });

  it('format an URL xxx.xxx.xx to xxx.xx', () => {
    const result = extractDomainName('https://docs.expo.dev');
    expect(result).toEqual('expo.dev');
  });

  it('format an URL xxx.xxx.xx/ to xxx.xx', () => {
    const result = extractDomainName('https://www.runway.team/');
    expect(result).toEqual('runway.team');
  });

  it('format an URL https://xxxx-xxxx.xx.xxx/ to xxx.xx.xxx', () => {
    const result = extractDomainName('https://exodus-privacy.eu.org/');
    expect(result).toEqual('exodus-privacy.eu.org');
  });
});
