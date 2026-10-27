import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { podcastEpisodes } from '../../fixtures/podcast-episodes.fixture';
import { ogLogoFileFor } from './og-server';

const OG_LOGO_DIR = join(__dirname, '../../public/images/podcast-logos/og');

describe('ogLogoFileFor', () => {
  it('maps any company_logo to its PNG copy', () => {
    expect(ogLogoFileFor('/images/podcast-logos/doctolib.webp')).toBe(
      'doctolib.png',
    );
    expect(ogLogoFileFor('/images/podcast-logos/mobiskill_logo.jpg')).toBe(
      'mobiskill_logo.png',
    );
  });
});

describe('podcast OG logos', () => {
  // The podcast OG image can't decode webp: a new episode needs a 256px PNG
  // in public/images/podcast-logos/og/, e.g.
  //   magick logo.webp -resize '256x256>' -strip og/logo.png
  it.each(
    podcastEpisodes
      .map((episode) => episode.company_logo)
      .filter((logo): logo is string => Boolean(logo))
      .map((logo) => [logo]),
  )('%s has an OG PNG copy', (logo) => {
    expect(existsSync(join(OG_LOGO_DIR, ogLogoFileFor(logo)))).toBe(true);
  });
});
