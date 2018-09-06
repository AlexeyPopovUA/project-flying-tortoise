window.JSX = require('hyperscript');
import "./../styles/index.scss";
import Header from "./components/Header.jsx";
import Grid from "./components/Grid.jsx";

const fetchUrl = "https://static.usabilla.com/recruitment/apidemo.json";

window.addEventListener("load", () => {
    fetch(fetchUrl)
        .then(result => result.json())
        .then(json => {
            console.warn("fetch", json);

            document.body.appendChild(
                <div className="main">
                    {(new Header()).render()}
                    {(new Grid()).render()}
                    <div className="footer">
                        <div className="author">Developed by O.Popov, 2018</div>
                        <div className="sources">
                            <a href="https://github.com/AlexeyPopovUA/project-flying-tortoise">GitHub sources</a>
                        </div>
                    </div>
                </div>);
        })
        .catch(error => console.error(error));
});