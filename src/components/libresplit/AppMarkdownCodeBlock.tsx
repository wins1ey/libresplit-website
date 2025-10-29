import { CodeBlock } from "react-code-block";

export type AppMarkdownCodeBlockProps = {
  code: string;
  language?: string;
  className?: string;
};

export function AppMarkdownCodeBlock({
  code,
  language,
  className,
}: AppMarkdownCodeBlockProps) {
  return (
    <div className={className}>
      <CodeBlock code={code} language={language ?? "text"}>
        <CodeBlock.Code>
          <CodeBlock.LineContent>
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </CodeBlock.Code>
      </CodeBlock>
    </div>
  );
}
