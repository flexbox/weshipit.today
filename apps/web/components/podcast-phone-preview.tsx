import { BackwardIcon, ForwardIcon, PlayIcon } from '@heroicons/react/24/solid';
import { PhoneSchematic, SHEET_WIDTH } from '@weshipit/ui';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { podcastEpisodes } from '../fixtures/podcast-episodes.fixture';

// Sizes are in cqw so the whole mockup scales with the figure rather than
// jumping between breakpoints - 1cqw is 1% of the phone figure's width. The
// sheet width is imported rather than repeated so the two cannot drift.
const cq = (sheetUnits: number) => `${(sheetUnits / SHEET_WIDTH) * 100}cqw`;

interface PodcastPhonePreviewProps {
  /** Episode slug from the podcast fixture. */
  slug?: string;
  className?: string;
}

export function PodcastPhonePreview({
  slug = 'vjeux',
  className,
}: PodcastPhonePreviewProps) {
  const episode = podcastEpisodes.find((item) => item.slug === slug);

  if (!episode?.youtube_embed_id) {
    return null;
  }

  const guest = episode.guests[0];

  return (
    <PhoneSchematic
      className={className}
      figure="FIG.038"
      title={`Schéma d’un téléphone affichant l’épisode ${episode.number} du Cross Platform Show`}
    >
      <div className="flex h-full flex-col bg-neutral-950">
        <div className="aspect-video w-full shrink-0">
          <LiteYouTubeEmbed
            id={episode.youtube_embed_id}
            title={episode.title}
            poster="maxresdefault"
            webp
          />
        </div>

        <div
          className="flex flex-1 flex-col text-white"
          style={{ padding: cq(16), gap: cq(7) }}
        >
          <div
            className="font-medium uppercase text-primary"
            style={{ fontSize: cq(11), letterSpacing: '0.08em' }}
          >
            Épisode {episode.number}
          </div>
          <div
            className="font-semibold leading-snug text-pretty"
            style={{ fontSize: cq(15) }}
          >
            {episode.title.split(' - ')[0]}
          </div>
          <div className="text-neutral-400" style={{ fontSize: cq(12) }}>
            {guest} · vjeux
          </div>

          <p
            className="text-pretty text-neutral-500"
            style={{ fontSize: cq(11), lineHeight: 1.5 }}
          >
            {episode.description_short}
          </p>

          {/* Transport sits at the bottom of the screen, the way a podcast app
              lays it out - and keeps the lower half from reading as dead space. */}
          <div className="mt-auto" style={{ paddingTop: cq(14) }}>
            <div
              className="w-full overflow-hidden rounded-full bg-white/15"
              style={{ height: cq(4) }}
            >
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
            <div
              className="flex justify-between tabular-nums text-neutral-500"
              style={{ fontSize: cq(10), marginTop: cq(7) }}
            >
              <span>24:10</span>
              <span>1:12:04</span>
            </div>

            <div
              className="flex items-center justify-center text-white"
              style={{ gap: cq(19), marginTop: cq(11) }}
            >
              <BackwardIcon style={{ width: cq(18), height: cq(18) }} />
              <span
                className="flex items-center justify-center rounded-full bg-white text-neutral-950"
                style={{ width: cq(36), height: cq(36) }}
              >
                <PlayIcon style={{ width: cq(18), height: cq(18) }} />
              </span>
              <ForwardIcon style={{ width: cq(18), height: cq(18) }} />
            </div>
          </div>
        </div>
      </div>
    </PhoneSchematic>
  );
}

export default PodcastPhonePreview;
