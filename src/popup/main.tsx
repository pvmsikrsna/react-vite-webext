import React from "react";
import {createRoot} from "react-dom/client";
import "../styles";
import {Popup} from "./Popup";
const elementId = `webtools-app-popup`
let container = createRoot(document.querySelector(`#${elementId}`) as HTMLElement)
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
