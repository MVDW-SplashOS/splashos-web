import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Pulse } from "@/components/ui/pulse";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import {
    Download,
    Github,
    Twitter,
    MessageSquare,
    Cpu,
    Zap,
    Globe,
} from "lucide-react";
import "./App.css";

function App() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <header
                className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-[border] duration-200 border-b border-transparent data-[scrolled=true]:border-border"
                data-scrolled={
                    typeof window !== "undefined" && window.scrollY > 0
                }
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">SplashOS</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <a
                            href="#features"
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#download"
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            Download
                        </a>
                        <a
                            href="#community"
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            Community
                        </a>
                        <a
                            href="https://docs.splashos.com"
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            Documentation
                        </a>
                    </nav>
                    <Button variant="outline" size="sm" className="md:hidden">
                        Menu
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
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
                                    Experience a seamless fusion of power and
                                    simplicity. SplashOS Vision is here — a
                                    preview of the extraordinary.
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
                                    <MessageSquare className="h-5 w-5" />
                                    Join Discord
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-8 pt-8 md:grid-cols-4 md:gap-12">
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Pulse
                                            size="sm"
                                            pulseFrom="var(--chart-2)"
                                            pulseTo="var(--chart-3)"
                                        />
                                        <div className="text-3xl font-bold">
                                            2.4s
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Boot Time
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Pulse
                                            size="sm"
                                            pulseFrom="var(--primary)"
                                            pulseTo="var(--accent)"
                                        />
                                        <div className="text-3xl font-bold">
                                            600MB
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Memory Usage
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Pulse
                                            size="sm"
                                            pulseFrom="var(--chart-4)"
                                            pulseTo="var(--chart-5)"
                                        />
                                        <div className="text-3xl font-bold">
                                            10K+
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Packages
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Pulse
                                            size="sm"
                                            pulseFrom="var(--destructive)"
                                            pulseTo="var(--accent-foreground)"
                                        />
                                        <div className="text-3xl font-bold">
                                            24/7
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Support
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full py-12 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                Two Editions. One Vision.
                            </h2>
                            <p className="max-w-225 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Experience the future of computing with our
                                complementary approaches.
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
                                                <CardTitle>
                                                    SplashOS Vision
                                                </CardTitle>
                                            </div>
                                            <CardDescription>
                                                A vision of what an operating
                                                system should be.
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed pb-4">
                                        SplashOS Vision is where the future
                                        begins. A powerful, Fedora-based preview
                                        designed for rapid innovation and
                                        community feedback. Experience the
                                        vision before it becomes the flagship.
                                    </p>
                                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                            <span>
                                                Built on the robust Fedora
                                                Workstation foundation
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                            <span>
                                                Rapid development cycles for the
                                                latest advancements
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                            <span>
                                                Exclusive access to
                                                groundbreaking experimental
                                                features
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                            <span>
                                                Frequent updates with weekly
                                                testing releases
                                            </span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t">
                                        This is the proving ground. Join us in
                                        shaping the next generation of desktop
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
                                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed  pb-4">
                                        SplashOS is where the vision becomes
                                        reality. Our flagship distribution,
                                        built from scratch, designed for
                                        ultimate performance and stability.
                                        Experience the future of desktop
                                        computing, engineered for perfection.
                                    </p>
                                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                                            <span>
                                                Custom-built from the ground up
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                                            <span>
                                                Revolutionary desktop
                                                environment
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                                            <span>Unmatched performance</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></div>
                                            <span>
                                                Production-ready stability
                                            </span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t">
                                        This is the destination. The culmination
                                        of our vision for the next generation of
                                        desktop computing.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Download Section */}
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
                                    Download SplashOS Vision today and be part
                                    of our testing community. Help us build the
                                    future while enjoying a cutting-edge Fedora
                                    experience.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 min-[400px]:flex-row">
                                <Button size="lg" className="gap-2">
                                    <Download className="h-5 w-5" />
                                    Download SplashOS Vision (v0.1.0)
                                </Button>
                                <Button size="lg" className="gap-2">
                                    <Download className="h-5 w-5" />
                                    Download SplashOS (soon)
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="gap-2"
                                >
                                    <Globe className="h-5 w-5" />
                                    Learn About SplashOS
                                </Button>
                            </div>
                            <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                                <strong>SplashOS Vision Requirements:</strong>{" "}
                                2GB RAM, 20GB storage, 64-bit processor
                                <br />
                                <strong>SplashOS (Coming Soon):</strong> 4GB
                                RAM, 30GB storage, 64-bit processor
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community Section */}
                <section id="community" className="w-full py-12 md:py-24">
                    <div className="mx-auto max-w-7xl px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Join Our Community
                            </h2>
                            <p className="max-w-225 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Connect with other users, get help, and
                                contribute to the project
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                            <a
                                href="https://discord.gg/splashos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50"
                            >
                                <MessageSquare className="h-12 w-12 text-[#5865F2]" />
                                <div className="space-y-2 text-center">
                                    <h3 className="text-xl font-bold">
                                        Discord
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Chat with the community and get
                                        real-time support
                                    </p>
                                </div>
                            </a>
                            <a
                                href="https://twitter.com/splashos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50"
                            >
                                <Twitter className="h-12 w-12 text-[#1DA1F2]" />
                                <div className="space-y-2 text-center">
                                    <h3 className="text-xl font-bold">
                                        Twitter / X
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Follow us for the latest updates and
                                        announcements
                                    </p>
                                </div>
                            </a>
                            <a
                                href="https://github.com/splashos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50"
                            >
                                <Github className="h-12 w-12" />
                                <div className="space-y-2 text-center">
                                    <h3 className="text-xl font-bold">
                                        GitHub
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Contribute to the project and report
                                        issues
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t py-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold">SplashOS</span>
                        <span className="text-xs text-muted-foreground">
                            / Vision
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/orgs/MVDW-SplashOS/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <a
                            href="https://twitter.com/splashos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a
                            href="https://discord.gg/splashos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            <MessageSquare className="h-5 w-5" />
                        </a>
                    </div>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-right">
                        <p>
                            © {new Date().getFullYear()} SplashOS Project. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
