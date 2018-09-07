export default class Store {
    /**
     * @param {{url: string}} config
     */
    constructor(config) {
        this.config = config;
        this._originalData = null;
        this.data = null;
        this._filter = null;
        this._sorter = null;
    }

    load() {
        return fetch(this.config.url)
            .then(result => result.json())
            .then(json => {
                console.warn("fetch", json);
                this.setData(json.items);
            })
            .catch(error => {
                console.error(error);
                this.setData([]);
            })
            .then(() => this.getData());
    }

    setData(list) {
        this._originalData = list;
        this.data = this._originalData.slice();

        if (this._filter) {
            //filter
        }

        if (this._sorter) {
            //sort
        }
    }

    /**
     * @returns {*[]}
     */
    getData() {
        return this.data.slice();
    }

    /**
     * @param {{key: string, value: string|number}} filter
     */
    filter(filter) {
        this._filter = filter;
        //filter this.data
    }

    /**
     * @param {{key: string, direction: ("ASC"|"DESC")}} sorter
     */
    sort(sorter) {
        this._sorter = sorter;
        //sort this.data
    }
}