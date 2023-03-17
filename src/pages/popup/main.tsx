import "../../styles";
import React from "react";
import ReactDOM from "react-dom/client";
import {Popup} from "./Popup";

let container = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
let UI =  <Popup />;
container.render(UI)
/*
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
*/
