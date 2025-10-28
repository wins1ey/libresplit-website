import { fromMarkdown } from "mdast-util-from-markdown";

export function MarkdownToJSX({ content }: { content: string }) {
  const tree = fromMarkdown(content);

  function renderNode(node: any): React.ReactNode {
    switch (node.type) {
      case "text":
        return node.value;
      case "paragraph":
        return <p className="text-red-500">{node.children.map(renderNode)}</p>;
      case "heading":
        return (
          <h1 className="text-xl text-blue-500">
            {node.children.map(renderNode)}
          </h1>
        );
      default:
        return node.children?.map(renderNode);
    }
  }

  return <div>{tree.children.map(renderNode)}</div>;
}
