import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
