
import { siGithub, siX, siDiscord } from "simple-icons";

export function CommunitySection() {
  return (
    <section id="community" className="w-full py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Join Our Community
          </h2>
          <p className="max-w-225 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Connect with other users, get help, and contribute to the project
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <a
            href="https://twitter.com/splashos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50"
          >
            <svg
              className="h-12 w-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={siX.path} />
            </svg>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Twitter / X</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Follow us for the latest updates and announcements
              </p>
            </div>
          </a>
          <a
            href="https://discord.gg/splashos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50"
          >
            <svg
              className="h-12 w-12 text-[#5865F2]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={siDiscord.path} />
            </svg>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Discord</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Chat with the community and get real-time support
              </p>
            </div>
          </a>
          <a
            href="https://github.com/orgs/MVDW-SplashOS/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50"
          >
            <svg
              className="h-12 w-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={siGithub.path} />
            </svg>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">GitHub</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Contribute to the project and report issues
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
