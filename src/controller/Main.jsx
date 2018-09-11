import Store from "../collection/Store.js";
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
        this.header.on("filters-changed", () => {
            const filterValues = this.header.getValues();
            const filters = [new Filter("rating", filterValues.ratings, Filter.TYPE.IN_LIST)];

            if (filterValues.search.length > 0) {
                filters.push(new Filter("comment", filterValues.search, Filter.TYPE.CONTAINS));
            }

            this.store.setFilters(filters);
            this.grid.update();
        });
    }
}
