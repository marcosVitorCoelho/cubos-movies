import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import Layout from "./components/Layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieDetail from "./pages/MovieDetail.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="/moviedetail/:movieId" element={<MovieDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
