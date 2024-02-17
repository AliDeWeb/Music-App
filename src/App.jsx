import "./assets/css/App.css";

//? Fonts
import "./assets/fonts/abel/Abel-Regular.ttf";
import "./assets/fonts/inter/Inter-Regular.ttf";
import "./assets/fonts/inter/Inter-SemiBold.ttf";
import "./assets/fonts/inter/Inter-Bold.ttf";

//? Coms
import routesPath from "./setting/Router";

//? Hooks
import { useRoutes } from "react-router-dom";

function App() {
  return <>{useRoutes(routesPath)}</>;
}

export default App;
