import ReactDOM from "react-dom/";
import {Popup} from "./Popup";


let container = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
let UI =  <Popup />;
container.render(UI)
