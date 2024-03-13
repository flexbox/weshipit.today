import { Text } from '../text/text';

interface HeroProps {
  children?: React.ReactNode;
  hintLink?: string;
  hintTitle?: string;
  hintDescription?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  badgeStyle?: string;
}

export function Hero({
  children,
  title,
  hintLink,
  hintDescription,
  hintTitle,
  badgeStyle,
  description,
}: HeroProps) {
  return (
    <div className="mx-auto w-full max-w-7xl py-2 text-center lg:py-12 lg:text-left">
      <div className="mx-auto w-full lg:shrink-0">
        {hintTitle && (
          <div className="my-4">
            {hintLink ? (
              <a href={hintLink} className="inline-flex space-x-6">
                <span
                  className={`rounded-full ${badgeStyle} px-3 py-1 text-sm font-semibold leading-6  ring-1 ring-inset`}
                >
                  {hintTitle}
                </span>
                {hintDescription && (
                  <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                    <span>{hintDescription}</span>
                  </span>
                )}
              </a>
            ) : (
              <div className="inline-flex space-x-6">
                <span
                  className={`rounded-full ${badgeStyle} px-3 py-1 text-sm font-semibold leading-6  ring-1 ring-inset`}
                >
                  {hintTitle}
                </span>
                {hintDescription && (
                  <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                    <span>{hintDescription}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        <Text variant="h2" as="h1">
          {title}
        </Text>
        {description && (
          <p className="text-lg leading-8 text-gray-500">{description}</p>
        )}
        {children && (
          <div className="mt-10 items-center gap-x-6">{children}</div>
        )}
      </div>
    </div>
  );
}

export default Hero;
