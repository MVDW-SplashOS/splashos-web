import { Button } from "@/components/ui/button";
import { Pulse } from "@/components/ui/pulse";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { Download } from "lucide-react";
import { siDiscord } from "simple-icons";

export function HeroSection() {
  return (
    <section className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Pulse
              size="sm"
              className="mr-2"
              pulseFrom="var(--muted-foreground)"
              pulseTo="var(--primary)"
            />
            Introducing SplashOS Vision
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              The future of the desktop.
              <br />
              <AnimatedGradientText
                text="Reimagined."
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold"
                colors={[
                  "#3B82F6",
                  "#8B5CF6",
                  "#EC4899",
                  "#10B981",
                  "#F59E0B",
                ]}
                speed={0.5}
                blur={15}
                particleCount={50}
                fontSize="clamp(3rem, 8vw, 6rem)"
                fontFamily="inherit"
                fontWeight="600"
              />
            </h1>
            <p className="mx-auto max-w-3xl text-2xl text-gray-600 dark:text-gray-400 font-light">
              Experience a seamless fusion of power and simplicity. SplashOS Vision is here — a preview of the extraordinary.
            </p>
          </div>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button
              size="lg"
              className="gap-2"
              href="#download"
            >
              <Download className="h-5 w-5" />
              Download SplashOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={siDiscord.path} />
              </svg>
              Join Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
