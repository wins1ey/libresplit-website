import React from "react";

import { fromMarkdown } from "mdast-util-from-markdown";
import { CodeBlock } from "react-code-block";

export function Markdown({ content }: { content: string }) {
  const tree = fromMarkdown(content);

  function renderChildren(node: any): React.ReactNode | null {
    if (!node.children) {
      return null;
    }
    return node.children.map((child: any, i: number) => (
      <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
    ));
  }

  function renderNode(node: any): React.ReactNode {
    switch (node.type) {
      case "text":
        return node.value;

      // Handles paragraph text.
      case "paragraph":
        return <p>{renderChildren(node)}</p>;

      // Handles headings #, ## and ###.
      case "heading":
        switch (node.depth) {
          case 1:
            return (
              <h1 className="text-3xl font-bold">{renderChildren(node)}</h1>
            );
          case 2:
            return (
              <h2 className="text-2xl font-semibold">{renderChildren(node)}</h2>
            );
          case 3:
            return (
              <h3 className="text-xl font-medium">{renderChildren(node)}</h3>
            );
          default:
            return <div className="text-gray-700">{renderChildren(node)}</div>;
        }

      // Handles links in markdown [text](url).
      case "link":
        return <a href={node.url}>{renderChildren(node)}</a>;

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
            {renderChildren(node)}
          </ListTag>
        );
      }
      case "listItem": {
        return <li>{renderChildren(node)}</li>;
      }

      // Handles code blocks.
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
        return renderChildren(node);
    }
  }

  return <div>{tree.children.map(renderNode)}</div>;
}
