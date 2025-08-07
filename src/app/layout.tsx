import "~/styles/globals.css";

import { type Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "~/components/ThemeProvider";
import { ThemeToggle } from "~/components/ThemeToggle";

export const metadata: Metadata = {
  title: "ColorGuessr",
  description: "Test your color perception skills! Can you guess the hex/rgb values of colors just by looking at them? Challenge yourself with our color guessing game.",
  authors: [{ name: "Daniel Miller" }],
  creator: "Daniel Miller",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://colorguessr.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ColorGuessr - Test Your Color Perception",
    description: "Challenge your color perception skills with our interactive color guessing game. Guess hex and RGB values just by looking at colors!",
    url: "https://colorguessr.com",
    siteName: "ColorGuessr",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ColorGuessr - Color Guessing Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorGuessr - Test Your Color Perception",
    description: "Challenge your color perception skills with our interactive color guessing game. Guess hex and RGB values just by looking at colors!",
    images: ["/og-image.png"],
    creator: "@danielmiller",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
