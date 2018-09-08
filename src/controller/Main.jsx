import Store from "../collection/Store.jsx";
import Header from "../components/Header.jsx";
import Grid from "../components/Grid.jsx";
import Footer from "../components/Footer.jsx";
import Filter from "../model/Filter";

export default class Main {
    constructor() {
        const fetchUrl = "https://static.usabilla.com/recruitment/apidemo.json";
        this.store = new Store({url: fetchUrl});
        this.header = new Header();
        this.grid = new Grid({store: this.store});
        this.footer = new Footer();

        this.addEventListeners();
    }

    run() {
        this.store
            .load()
            .then(() => {
                document.body.appendChild(
                    <div className="main container-fluid">
                        {this.header.render()}
                        {this.grid.render()}
                        {this.footer.render()}
                    </div>
                );
            })
            .catch(error => console.error(error));
    }

    addEventListeners() {
        this.header.on("rating-selected", rating => {
            console.warn("rating-selected", rating);

            this.store.filter(new Filter("rating", rating));
            this.grid.update();
        })
    }
}
