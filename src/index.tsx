import React from "react";
import ReactDOM from "react-dom/client";
import "Styles/style.scss";
import { App } from "./App";

const RootComponent = () => {
  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(<RootComponent />);
