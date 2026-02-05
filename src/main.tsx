import { ViteReactSSG } from "vite-react-ssg";
import "./index.css";
import App from "./App.tsx";

const routesWithLayout = [
  {
    path: "/",
    Component: App,
  },
];

export const createRoot = ViteReactSSG({ routes: routesWithLayout });
