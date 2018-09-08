window.JSX = require('hyperscript');
import Main from "./controller/Main.jsx";
import "./../styles/index.scss";

window.addEventListener("load", () => (new Main()).run());