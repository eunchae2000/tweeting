import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // React.StrictMode => 애플리케이션의 잠재적인 문제를 알아내기 위한 도구
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
