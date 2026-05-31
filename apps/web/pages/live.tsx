import { useEffect, useState } from 'react';
import { Layout } from '../components/layout';

export default function Live() {
  const [parentDomain, setParentDomain] = useState('localhost');

  useEffect(() => {
    // Get the current hostname when component mounts (client-side only)
    const hostname = window.location.hostname;
    setParentDomain(hostname);
  }, []);

  const size = {
    height: '850',
    width: '50%',
    backgroundColor: '#eaeaec',
    border: '0px',
  };

  return (
    <Layout
      seoTitle="Live Chat"
      seoDescription="Join our live chat on Twitch and YouTube"
      withHeader
    >
      <div className="flex flex-row">
        <iframe
          src={`https://www.youtube.com/live_chat?v=IIIIIDDDDDD&embed_domain=${parentDomain}`}
          {...size}
        />
        <iframe
          src={`https://www.twitch.tv/embed/flexboxLive/chat?parent=${parentDomain}`}
          sandbox="allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          {...size}
        />
      </div>
    </Layout>
  );
}
