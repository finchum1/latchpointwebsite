"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

// The theme lives on the DOM (a data-theme attribute), set flash-free
// before hydration by the inline script in layout.tsx -- useSyncExternalStore
// is the canonical way to read genuinely external, mutable state like that
// into React without the "setState inside an effect" anti-pattern a plain
// useEffect would need here.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// The server (and the initial client render, before this hook resyncs)
// always assumes dark, this site's default -- matching what the bare
// :root tokens already render, so there's nothing to mismatch against.
function getServerSnapshot() {
  return "dark" as const;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("latchpoint-theme", next);
    } catch {
      // Private browsing / storage disabled -- the toggle still works for
      // this page load, it just won't be remembered next visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-elevated-2 hover:text-text ${className}`}
    >
      {theme === "light" ? (
        <Moon weight="bold" className="size-[18px]" />
      ) : (
        <Sun weight="bold" className="size-[18px]" />
      )}
    </button>
  );
}
