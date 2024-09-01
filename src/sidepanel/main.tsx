import {Sidepanel} from "./Sidepanel";
import {createRoot} from "react-dom/client";
import "../styles";

const elementId = `webtools-app-sidepanel`
let container = createRoot(document.querySelector(`#${elementId}`) as HTMLElement)
let UI = <Sidepanel/>;
container.render(UI)
/*
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
*/
