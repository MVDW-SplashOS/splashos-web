import { Button } from "@/components/ui/button";
import { Globe, Sun, Moon } from "lucide-react";
import { toggleTheme } from "@/lib/theme";
import { useEffect, useState } from "react";

export function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        handleScroll(); // Check initial scroll position
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-[border] duration-200 border-b border-transparent data-[scrolled=true]:border-border"
            data-scrolled={scrolled}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">SplashOS</span>
                    <span className="text-xs text-muted-foreground">
                        / A Randasoftware Project
                    </span>
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
                    <Button
                        size="lg"
                        variant="outline"
                        className="gap-2"
                        href="https://docs.splashos.com"
                    >
                        <Globe className="h-5 w-5" />
                        Learn About SplashOS
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleTheme}
                        className="rounded-full p-2 w-9 h-9 flex items-center justify-center"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-4 w-4 dark:hidden" />
                        <Moon className="h-4 w-4 hidden dark:block" />
                    </Button>
                </nav>
                <div className="flex items-center gap-2 md:hidden">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleTheme}
                        className="rounded-full p-2"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-4 w-4 dark:hidden" />
                        <Moon className="h-4 w-4 hidden dark:block" />
                    </Button>
                    <Button variant="outline" size="sm">
                        Menu
                    </Button>
                </div>
            </div>
        </header>
    );
}
