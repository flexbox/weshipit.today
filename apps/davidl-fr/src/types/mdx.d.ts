declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

export interface MDXProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}
