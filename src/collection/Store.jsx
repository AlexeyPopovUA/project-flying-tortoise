export default class Store {
    /**
     * @param {{url: string}} config
     */
    constructor(config) {
        this.config = config;
        this._originalData = null;
        this.data = null;
        /**
         * @type {Filter[]}
         * @private
         */
        this._filters = [];
        /**
         * @type {Sorter}
         * @private
         */
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

        if (this._filters.length > 0) {
            this._applyFilters();
        }

        if (this._sorter) {
            this._applySorter();
        }
    }

    /**
     * @returns {*[]}
     */
    getData() {
        return this.data.slice();
    }

    /**
     * @param {Filter} filter
     */
    filter(filter) {
        if (!this._filters.some(item => item.key)) {
            this._filters.push(filter);

            this._applyFilters();
        }
    }

    _applyFilters() {
        console.warn("_applyFilters");
    }

    /**
     * @param {Sorter} sorter
     */
    sort(sorter) {
        this._sorter = sorter;
        this._applySorter();
    }

    _applySorter() {
        console.warn("_applySorter");
    }

    destroy() {
        this.data = null;
        this._originalData = null;
        this._filters.length = 0;
        this._sorter = null;
    }
}