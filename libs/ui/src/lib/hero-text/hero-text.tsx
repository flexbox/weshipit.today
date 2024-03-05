export interface HeroTextProps {
  children?: React.ReactNode;
  hintLink?: string;
  hintTitle?: string;
  hintDescription?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  badgeStyle?: string;
}

export function HeroText({
  children,
  hintLink,
  hintDescription,
  hintTitle,
  title,
  description,
  badgeStyle,
}: HeroTextProps) {
  badgeStyle =
    badgeStyle || 'bg-indigo-600/10 text-indigo-600 ring-indigo-600/10';
  return (
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
      <h1 className="font-bold tracking-tight text-gray-900 sm:text-4xl md:text-2xl lg:text-3xl  xl:text-4xl dark:text-slate-300">
        {title}
      </h1>
      {description && (
        <p className="mt-6 text-lg leading-8 text-gray-300">{description}</p>
      )}
      {children && (
        <div className="mt-10 flex items-center gap-x-6">{children}</div>
      )}
    </div>
  );
}
