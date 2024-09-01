import {createRoot} from "react-dom/client";
import "../styles";
import {OptionsApp} from "./Options";


let container = createRoot(document.querySelector('#app') as HTMLElement);
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
