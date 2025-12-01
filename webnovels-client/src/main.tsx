import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";

import { router } from "./routes/routes.tsx";

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  return (
    <AuthProvider>
      <RouterProvider router={router} context={{ auth: auth }} />
    </AuthProvider>
  );
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
