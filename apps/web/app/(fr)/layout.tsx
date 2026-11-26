import type { Metadata, Viewport } from 'next';
import { RootDocument } from '../../components/root-document';
import { baseMetadata, baseViewport } from '../../utils/seo/metadata';

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = baseViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument lang="fr">{children}</RootDocument>;
}
