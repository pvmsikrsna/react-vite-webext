import "../styles";
import React from "react";
import {Popup} from "./Popup";
import {createRoot} from "react-dom/client";

let container = createRoot(document.querySelector('#root') as HTMLElement)
let UI = <Popup/>;
container.render(UI)

/*
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
*/
