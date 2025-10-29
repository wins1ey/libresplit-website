import { Card, CardContent } from "../ui/card";
import { CodeBlock } from "react-code-block";

export type AppMarkdownCodeBlockProps = {
  code: string;
  language?: string;
};

export function AppMarkdownCodeBlock({
  code,
  language,
}: AppMarkdownCodeBlockProps) {
  return (
    <div className="w-fit px-2">
      <Card className="w-fit">
        <CardContent className="w-fit">
          <CodeBlock code={code} language={language ?? "text"}>
            <CodeBlock.Code>
              <CodeBlock.LineContent>
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </CodeBlock.Code>
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
