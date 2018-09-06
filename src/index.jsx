window.JSX = require('hyperscript');
import "./../styles/index.scss";
import Header from "./components/Header.jsx";

const fetchUrl = "https://static.usabilla.com/recruitment/apidemo.json";

window.addEventListener("load", () => {
    fetch(fetchUrl)
        .then(result => result.json())
        .then(json => {
            console.warn("fetch", json);

            document.body.appendChild(
                <div className="main">
                    {(new Header()).render()}
                    <div className="sections">
                    </div>
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