import { fromMarkdown } from "mdast-util-from-markdown";
import { CodeBlock } from "react-code-block";

export function Markdown({ content }: { content: string }) {
  const tree = fromMarkdown(content);

  function renderNode(node: any): React.ReactNode {
    switch (node.type) {
      case "text":
        return node.value;

      case "paragraph":
        return <p>{node.children.map(renderNode)}</p>;

      // Handles headings #, ## and ###.
      case "heading":
        switch (node.depth) {
          case 1:
            return (
              <h1 className="text-3xl font-bold">
                {node.children.map(renderNode)}
              </h1>
            );
          case 2:
            return (
              <h2 className="text-2xl font-semibold">
                {node.children.map(renderNode)}
              </h2>
            );
          case 3:
            return (
              <h3 className="text-xl font-medium">
                {node.children.map(renderNode)}
              </h3>
            );
          default:
            return (
              <div className="text-gray-700">
                {node.children.map(renderNode)}
              </div>
            );
        }

      // Handles links in markdown [text](url).
      case "link":
        return <a href={node.url}>{node.children.map(renderNode)}</a>;

      // Handles lists.
      case "list": {
        // Select between ol and ul. Apply tailwind styling.
        const ListTag = node.ordered ? "ol" : "ul";
        const cls = node.ordered ? "list-decimal ml-6" : "list-disc ml-6";
        // Start only applys to ol(s).
        const startProps =
          node.ordered && node.start ? { start: node.start } : {};
        return (
          <ListTag className={cls} {...startProps}>
            {node.children.map(renderNode)}
          </ListTag>
        );
      }
      case "listItem": {
        return <li>{node.children.map(renderNode)}</li>;
      }

      case "code":
        return (
          <div>
            <CodeBlock code={node.value} language={node.lang}>
              <CodeBlock.Code>
                <CodeBlock.LineContent>
                  <CodeBlock.Token />
                </CodeBlock.LineContent>
              </CodeBlock.Code>
            </CodeBlock>
          </div>
        );

      case "inlineCode":
        return <p>{node.value}</p>;

      default:
        return node.children?.map(renderNode);
    }
  }

  return <div>{tree.children.map(renderNode)}</div>;
}
