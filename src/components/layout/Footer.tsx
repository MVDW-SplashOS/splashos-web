import { siGithub, siX, siDiscord } from "simple-icons";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">SplashOS</span>
          <span className="text-xs text-muted-foreground">
            / A Randasoftware Project
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/splashos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={siX.path} />
            </svg>
          </a>
          <a
            href="https://discord.gg/splashos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={siDiscord.path} />
            </svg>
          </a>
          <a
            href="https://github.com/orgs/MVDW-SplashOS/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={siGithub.path} />
            </svg>
          </a>
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-right">
          <p>
            © {new Date().getFullYear()} SplashOS Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
