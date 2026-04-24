import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)", fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
