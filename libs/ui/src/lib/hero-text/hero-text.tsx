import { Badge } from '../badge/badge';
import { Text } from '../text/text';

export interface HeroTextProps {
  children?: React.ReactNode;
  hintLink?: string;
  hintTitle?: string;
  hintDescription?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
}

interface HintBoxProps {
  hint: {
    hintTitle: string;
    hintDescription?: string;
  };
}

function HintBox({ hint }: HintBoxProps) {
  const { hintTitle, hintDescription } = hint;

  return (
    <>
      <Badge size="md" variant="blue">
        {hintTitle}
      </Badge>
      {hintDescription && (
        <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
          {hintDescription}
        </span>
      )}
    </>
  );
}

export function HeroText({
  children,
  hintLink,
  hintDescription,
  hintTitle,
  title,
  description,
}: HeroTextProps) {
  return (
    <div className="mx-auto w-full lg:shrink-0">
      {hintTitle && (
        <div className="my-4">
          {hintLink ? (
            <a href={hintLink} className="inline-flex space-x-6">
              <HintBox hint={{ hintTitle, hintDescription }} />
            </a>
          ) : (
            <div className="inline-flex space-x-6">
              <HintBox hint={{ hintTitle, hintDescription }} />
            </div>
          )}
        </div>
      )}
      <Text as="h1" variant="h1">
        {title}
      </Text>
      {description && (
        <p className="mt-6 text-lg leading-8 text-gray-300">{description}</p>
      )}
      {children && (
        <div className="mt-10 flex items-center gap-x-6">{children}</div>
      )}
    </div>
  );
}
