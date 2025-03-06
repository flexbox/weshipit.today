import { Header } from './header';

export default {
  component: Header,
  title: 'Header',
};

export const Default = () => <Header />;

export const WithLinks = () => (
  <>
    <Header />
    <Header
      callToActionButton={{
        name: 'Schedule 1-to-1 consulting',
        href: 'https://cal.com/davidl/coaching',
      }}
    />
    <Header
      navigation={[
        { name: 'Services', href: '#product' },
        { name: 'FAQ', href: '#features' },
        { name: 'Company', href: '#company' },
      ]}
    />
    <Header
      navigation={[
        { name: 'Services', href: '#product' },
        { name: 'FAQ', href: '#features' },
        { name: 'Company', href: '#company' },
      ]}
      callToActionLink={{
        name: 'Star Us on GitHub',
        href: 'https://github.com/flexbox/weshipit.today',
        isExternalLink: true,
      }}
      callToActionButton={{ name: 'Work with us', href: '/' }}
    />
  </>
);
