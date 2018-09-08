window.JSX = require('hyperscript');
import "./../styles/index.scss";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Grid from "./components/Grid.jsx";
import Store from "./Store.jsx";

const fetchUrl = "https://static.usabilla.com/recruitment/apidemo.json";

window.addEventListener("load", () => {
    const store = new Store({url: fetchUrl});

    store
        .load()
        .then(() => {
            document.body.appendChild(
                <div className="main container-fluid">
                    {(new Header()).render()}
                    {(new Grid({store})).render()}
                    {(new Footer()).render()}
                </div>
            );
        })
        .catch(error => console.error(error));
});