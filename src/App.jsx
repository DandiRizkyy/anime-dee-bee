import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnimeDetail from "./pages/AnimeDetail";
import Search from "./pages/Search";
import Trending from "./pages/Trending";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t mt-12">
          <div className="container py-8 text-center text-sm text-muted-foreground">
            <p>© 2024 AnimeDeeBee. All rights reserved.</p>
            <p className="mt-2">
              Data provided by{" "}
              <a
                href="https://jikan.moe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Jikan API
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
