import { fromMarkdown } from "mdast-util-from-markdown";

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

      case "code":
        return (
          <div>
            <h1>{node.lang}</h1>
            <p>{node.value}</p>
          </div>
        );

      default:
        return node.children?.map(renderNode);
    }
  }

  return <div>{tree.children.map(renderNode)}</div>;
}
