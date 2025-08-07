import { Palette, Code, Target, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { memo } from "react";

const HomePage = memo(function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/30 p-4">
      <div className="container max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
            Color<span className="text-blue-600 dark:text-blue-400">Guessr</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Can you guess the hex/rgb of a color just by looking at it?
          </p>
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Hex Mode */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Guess Hex</h3>
              <p className="text-muted-foreground mb-6">
                Test your color knowledge by guessing the hex code of displayed colors.
              </p>
              <Link href="/hex" className="block">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                  Play Hex Mode
                </button>
              </Link>
            </div>
          </div>

          {/* RGB Mode */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Guess RGB</h3>
              <p className="text-muted-foreground mb-6">
                Challenge yourself to identify the RGB values of various colors.
              </p>
              <Link href="/rgb" className="block">
                <button className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                  Play RGB Mode
                </button>
              </Link>
            </div>
          </div>

          {/* Practice Mode */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Practice</h3>
              <p className="text-muted-foreground mb-6">
                Hone your color recognition skills with unlimited practice rounds.
              </p>
              <Link href="/practice" className="block">
                <button className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-orange-700 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 cursor-pointer">
                  Start Practice
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer with Attribution */}
        <footer className="text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Link 
              href="https://www.github.com/syntheit/colorguessr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <FaGithub className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link 
              href="https://www.matv.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span className="font-medium">Created by Daniel Miller</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Test your color perception and improve your design skills
          </p>
        </footer>
      </div>
    </main>
  );
});

export default HomePage;
