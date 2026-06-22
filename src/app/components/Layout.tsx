import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { Outlet } from "@tanstack/react-router";
import { Route as RootRoute } from "../../routes/__root";

export function Layout() {
  const { categories } = RootRoute.useLoaderData();
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header
        categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
      />

      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
