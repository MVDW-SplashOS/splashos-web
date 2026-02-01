import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadSection() {
  return (
    <section
      id="download"
      className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Start with SplashOS Vision
            </h2>
            <p className="max-w-225 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Download SplashOS Vision today and be part of our testing community. Help us build the
              future while enjoying a cutting-edge Fedora experience.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download SplashOS Vision (v0.1.0)
            </Button>
            <Button size="lg" className="gap-2" disabled>
              <Download className="h-5 w-5" />
              Download SplashOS (soon)
            </Button>
          </div>
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <strong>SplashOS Vision Requirements:</strong> 2GB RAM, 20GB storage, 64-bit processor
          </div>
        </div>
      </div>
    </section>
  );
}
