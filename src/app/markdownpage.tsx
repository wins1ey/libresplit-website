import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/devibeans.css";

interface MarkdownPageProps {
  mdPath: string;
}

export function MarkdownPage({ mdPath }: MarkdownPageProps) {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    import(`${mdPath}?raw`)
      .then((module) => setMarkdown(module.default))
      .catch((err) => console.error("Failed to load markdown:", err));
  }, [mdPath]);

  return (
    <div className="p-6 max-w-5xl mx-auto prose prose-slate dark:prose-invert max-w-none markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
