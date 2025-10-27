import { useEffect, useState } from "react";

export function AppGitHubReadme() {
  const [readme, setReadme] = useState<string>("Loading...");

  const urlReadme =
    "https://raw.githubusercontent.com/LibreSplit/LibreSplit/refs/heads/main/README.md";

  // Fetch markdown from GitHub page for LibreSplit, place into the readme state.
  useEffect(() => {
    fetch(urlReadme)
      .then((res) => {
        // Check for HTTP error.
        if (!res.ok) throw new Error("HTTP Error! Status: ${res.status}");
        return res.text();
      })
      .then((text) => setReadme(text))
      .catch(() => {
        setReadme("Failed to load README from GitHub.");
      });
  }, []);

  return (
    <div>
      <p>{readme}</p>
    </div>
  );
}
