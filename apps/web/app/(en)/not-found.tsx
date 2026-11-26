import { NotFoundContent } from '../../components/not-found-content';
import { PageShell } from '../../components/page-shell';

/** Shown when a page in this layout calls `notFound()`. */
export default function NotFound() {
  return (
    <PageShell withHeader withContainer withFooter>
      <NotFoundContent />
    </PageShell>
  );
}
