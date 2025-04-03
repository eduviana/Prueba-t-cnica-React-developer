import { BrowserRouter, Routes, Route } from "react-router"; // Importación correcta
import App from "../App";
import Series from "../pages/Series";
import Movies from "../pages/Movies";
import { Layout } from "../layout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<App />} />

        {/* Otras rutas */}
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />

        {/* Ruta para 404 (opcional) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Componente de página no encontrada
function NotFound() {
  return (
    <Layout title="Popular Titles">
      <div className="max-w-[1600px] mx-auto mt-10">
        <h1>Oops, something went wrong...</h1>
      </div>
    </Layout>
  );
}
