import RichText from '~/components/Blog/Post/RichText';
import { ProseContainer } from '~/components/Container/ProseContainer';

export function PatternItem({ pattern }) {
  const { body } = pattern.data;
  const id = pattern.uid;
  const title = pattern.data.title[0].text;
  return (
    <ProseContainer>
      <h1 id={id}>
        <a
          href={`#${id}`}
          className="inline-flex !text-xl font-bold text-black no-underline hover:text-blue-500 dark:text-white dark:hover:text-orange-600"
        >
          {title}
        </a>
      </h1>
      <RichText render={body} />
    </ProseContainer>
  );
}
