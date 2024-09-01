import {Sidepanel} from "./Sidepanel";
import {createRoot} from "react-dom/client";
import "../styles";

let container = createRoot(document.querySelector('#app') as HTMLElement)
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
