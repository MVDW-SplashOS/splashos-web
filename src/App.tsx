import {
    Header,
    Footer,
    HeroSection,
    FeaturesSection,
    DownloadSection,
    CommunitySection,
} from "@/components";
import "./App.css";

function App() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <DownloadSection />
                <CommunitySection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
