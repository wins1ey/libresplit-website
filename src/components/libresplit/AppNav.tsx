import { Button } from "../ui/button";
import { AppThemeToggleButton } from "./AppThemeToggleButton";
import { Github } from "lucide-react";

export function AppNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b px-4 py-2">
      <div className="flex items-center">
        <LeftNav />
      </div>

      <div className="flex items-center">
        <RightNav />
      </div>
    </nav>
  );
}

function LeftNav() {
  return <span className="text-xl font-semibold">LibreSplit</span>;
}

function RightNav() {
  return (
    <div className="flex items-center gap-2">
      <Button>
        <a href="https://github.com/wins1ey/LibreSplit">
          <Github />
        </a>
      </Button>
      <AppThemeToggleButton />
    </div>
  );
}
