import { useEffect, useState } from "react";

import { AppLoading } from "./AppLoading";
import { Markdown } from "@/lib/markdown";

export function AppGitHubReadme() {
  const [readme, setReadme] = useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  const urlReadme =
    "https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/README.md";

  // Fetch markdown from GitHub page for LibreSplit, place into the readme state.
  useEffect(() => {
    fetch(urlReadme)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
        return res.text();
      })
      .then((text) => setReadme(text))
      .catch(() => setReadme("Failed to load README from GitHub."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <div>
      <Markdown content={readme} />
    </div>
  );
}
