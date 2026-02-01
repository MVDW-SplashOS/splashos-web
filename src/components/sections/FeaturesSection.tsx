import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Cpu } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Two Editions. One Vision.
          </h2>
          <p className="max-w-225 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Experience the future of computing with our complementary approaches.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle>SplashOS Vision</CardTitle>
                  </div>
                  <CardDescription>
                    A vision of what an operating system should be.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed pb-4">
                SplashOS Vision is where the future begins. A powerful, Fedora-based preview
                designed for testing innovation and community feedback. Experience the
                vision before it becomes the flagship.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span>Built on the robust Fedora Workstation foundation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span>Rapid development cycles for the latest advancements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span>Exclusive access to groundbreaking experimental features</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span>Frequent updates with weekly testing releases</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t">
                This is the proving ground. Join us in shaping the next generation of desktop
                computing.
              </p>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 shrink-0">
                  <Cpu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle>SplashOS</CardTitle>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      Coming Soon
                    </span>
                  </div>
                  <CardDescription>
                    Our flagship operating system.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed pb-4">
                SplashOS is where the vision becomes reality. Our flagship distribution,
                built from scratch, designed for ultimate performance and stability.
                Experience the future of desktop computing, engineered for perfection.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <span>Custom-built from the ground up</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <span>Revolutionary desktop environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <span>Unmatched performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                  <span>Production-ready stability</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t">
                This is the destination. The culmination of our vision for the next generation of
                desktop computing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
