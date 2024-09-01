import {createRoot} from "react-dom/client";
import "../styles";
import {OptionsApp} from "./Options";

const elementId = `webtools-app-options`
let container = createRoot(document.querySelector(`#${elementId}`) as HTMLElement)
let UI =  <OptionsApp />;
container.render(UI)
/*
ReactDOM.render(
  <React.StrictMode>
    <OptionsApp />
  </React.StrictMode>,
  document.getElementById("root")
);
*/
