import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata = {
  title: "Learning Tracker - Next.js",
  description: "Three-page demo app using Next.js App Router",
};

export default function RootLayout({ children } : { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0 }}>
        <header style={{
          background: "#111827",
          color: "#fff",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h2>Learning Tracker</h2>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/profile">Profile</Link>
          </nav>
        </header>
        
        <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
          {children}
        </main>

        <footer style={{ textAlign: "center", padding: "1rem", background: "#eee" }}>
          © {new Date().getFullYear()} Learning Tracker
        </footer>
      </body>
    </html>
  );
}
