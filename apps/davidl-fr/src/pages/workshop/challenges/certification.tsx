import Link from 'next/link';
import Layout from '~/components/Workshop/Layout';
import React from 'react';
import { NativeLink } from '~/components/Link/NativeLink';
import Image from 'next/image';
import { random } from 'lodash';
import { ProseContainer } from '~/components/Container/ProseContainer';

export default function CertificationPage() {
  const title =
    "I've just completed a React Native Bootcamp with @flexbox_ ! Check it out if you want to learn more about Expo, React Native, @tanstack/react-query, TypeScript, and more.";
  const urlToCertification = 'https://davidl.fr/bootcamp';

  const currentYear = new Date().getFullYear();
  const year = `&issueYear=${currentYear}`;
  const currentMonth = new Date().getMonth() + 1;
  const month = `&issueMonth=${currentMonth}`;
  const name = `&name=${encodeURI('React Native Bootcamp')}`;
  const organisationId = `&organizationId=81471864`;
  const isFromA2p = `&isFromA2p=true`;
  const licenseNumber = random(0, 1000000000);
  const certId = `&certId=${licenseNumber}`;
  const certUrl = `&certUrl=${encodeURI(urlToCertification)}`;
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME`;
  const certificationEndpoint = `${linkedInUrl}${name}${organisationId}${isFromA2p}${certId}${certUrl}${year}${month}`;

  return (
    <Layout>
      <ProseContainer withContentContainer>
        <h1>You did it</h1>
        <Image
          src="https://media.giphy.com/media/l1AsPDzmgSdwDG7v2/giphy.gif"
          alt="Certification React Native Bootcamp"
          className="bg-slate-200"
          width={480}
          height={200}
          style={{ width: '100%', height: 'auto' }}
        />
        <p>
          🎉 Congratulations, you finished this bootcamp. Let the world know
          about your achievement by sharing with your colleagues and fellow
          developers.
        </p>
        <NativeLink
          href={`https://twitter.com/intent/tweet?text=${title}+${urlToCertification}`}
        >
          🐦 Tweet
        </NativeLink>
        <h2>Add a certification to your profile</h2>
        <p>
          The first step is to add your certification to your Linkedin profile.
          Click on the link and follow this steps.
        </p>
        <NativeLink href={certificationEndpoint}>
          Add your certification to LinkedIn
        </NativeLink>
        <p>If it’s not working, you can add it manually:</p>
        <ol>
          <li>Open Linkedin</li>
          <Image
            src="/images/react-native-bootcamp-certification.png"
            alt="Certification Linkedin React Native Bootcamp"
            className="bg-slate-200"
            width={740}
            height={698}
            style={{ width: '100%', height: 'auto' }}
          />
          <li>
            Add Certification URL: <pre>{urlToCertification}</pre>
          </li>
          <li>Click on the save button</li>
        </ol>
        <p>You can now see your certification on your profile.</p>
        <Image
          src="/images/react-native-bootcamp-linkedin-preview.png"
          alt="Certification Linkedin React Native Bootcamp"
          className="bg-slate-200"
          width={815}
          height={363}
          style={{ width: '100%', height: 'auto' }}
        />

        <h2>Next step</h2>
        <p>
          If you have somme feedback on the entire experience{' '}
          <Link href="/workshop/feedback">you can leave a review here</Link>. As
          a thank you, I will send you a coupon for my book{' '}
          <strong>The Road to React Native</strong>.
        </p>
      </ProseContainer>
    </Layout>
  );
}
