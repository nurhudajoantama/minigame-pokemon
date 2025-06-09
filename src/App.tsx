import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./Layout/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import FullPageLoader from "./components/FullPageLoader";
import PokemonProvider from "./providers/PokemonProvider";

const queryClient = new QueryClient();

const IndexPage = lazy(() => import("./Pages/Index"));
const PokedexPage = lazy(() => import("./Pages/Pokedex"));

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>
          <BrowserRouter>
            <Suspense fallback={<FullPageLoader />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="" element={<IndexPage />} />
                  <Route path="pokedex" element={<PokedexPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </PokemonProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
