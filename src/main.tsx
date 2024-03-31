import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CreatePostProvider } from "./providers/post-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CreatePostProvider>
      <App />
    </CreatePostProvider>
  </React.StrictMode>
);
