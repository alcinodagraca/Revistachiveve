import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import ArtigosPage from "./pages/ArtigosPage";
import EdicaoImpressaPage from "./pages/EdicaoImpressaPage";
import EventosPage from "./pages/EventosPage";
import ConcursosPublicosPage from "./pages/ConcursosPublicosPage";
import ContactosUteisPage from "./pages/ContactosUteisPage";
import SobreNosPage from "./pages/SobreNosPage";
import ContactosPage from "./pages/ContactosPage";
import CategoryPage from "./pages/CategoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "artigos",
        element: <ArtigosPage />,
      },
      {
        path: "artigos/:category",
        element: <CategoryPage />,
      },
      {
        path: "edicao-impressa",
        element: <EdicaoImpressaPage />,
      },
      {
        path: "eventos",
        element: <EventosPage />,
      },
      {
        path: "concursos-publicos",
        element: <ConcursosPublicosPage />,
      },
      {
        path: "contactos-uteis",
        element: <ContactosUteisPage />,
      },
      {
        path: "sobre-nos",
        element: <SobreNosPage />,
      },
      {
        path: "contactos",
        element: <ContactosPage />,
      },
    ],
  },
]);
