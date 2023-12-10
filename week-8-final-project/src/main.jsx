import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PokemonDetails from "./components/PokemonDetails.jsx";
import PokemonList from "./components/PokemonList.jsx";
import LoginPage from "./components/loginform.jsx";
import { AuthProvider, AuthGuard } from "./context/authprovider.jsx";
import server from "./server.js";

server();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <App />
      </AuthGuard>
    ),
  },
  {
    path: "/signin",
    element: <LoginPage />,
  },
  {
    path: "/pokemon/:pokemonName",
    element: (
      <AuthGuard>
        <PokemonDetails />
      </AuthGuard>
    ),
  },
]);
const queryclient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryclient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
