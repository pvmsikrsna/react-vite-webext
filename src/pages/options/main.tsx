import React from "react";
import ReactDOM from "react-dom/client";
import "../../styles";
import { OptionsApp } from "./Options";



let container = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
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
