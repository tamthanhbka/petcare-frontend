// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./components/Auth";
import router from "./route";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
