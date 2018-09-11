import Filter from "./../model/Filter";

export default class Store {
    /**
     * @param {{url: string}} config
     */
    constructor(config) {
        this.config = config;

        /**
         * Keeps original version of data
         * @type {Array}
         * @private
         */
        this._originalData = null;
        /**
         * Keeps filtered/sorted data
         * @type {Array}
         */
        this.data = null;
        /**
         * @type {Filter[]}
         * @private
         */
        this._filters = [];
        /**
         * todo Implement sorting
         * @type {Sorter}
         * @private
         */
        this._sorter = null;
    }

    /**
     * Loads data from remote source and saves it into the store
     * @returns {Promise<Array>}
     */
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

    /**
     * Replaces saved data with new list
     * Applies filters/sorters
     * @param list
     */
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
     * Retrieves stored data with filters/sorters applied
     * @returns {Array}
     */
    getData() {
        return this.data.slice();
    }

    /**
     * Sets and applies new filters
     * @param {Filter[]} filters
     */
    setFilters(filters) {
        this._filters = filters;

        this._applyFilters();
    }

    /**
     * Saves filtered data
     * @private
     */
    _applyFilters() {
        let newData = this._originalData.slice();

        this._filters.forEach(filter => {
            newData = newData.filter(item => {
                if (filter.type === Filter.TYPE.EQUALS) {
                    //strict comparison
                    return item[filter.key] === filter.value;
                } else if (filter.type === Filter.TYPE.CONTAINS) {
                    //string matching
                    return `${item[filter.key]}`.includes(filter.value);
                } else if (filter.type === Filter.TYPE.IN_LIST) {
                    //strict comparison
                    return filter.value.includes(item[filter.key]);
                } else {
                    //unknown setFilters type
                    return false;
                }
            })
        });

        this.data = newData;
    }

    /**
     * todo Implement
     * @param {Sorter} sorter
     */
    sort(sorter) {
        this._sorter = sorter;
        this._applySorter();
    }

    /**
     * todo Implement
     * @private
     */
    _applySorter() {
        console.warn("_applySorter");
    }

    /**
     * For tests
     */
    destroy() {
        this.data = null;
        this._originalData = null;
        this._filters.length = 0;
        this._sorter = null;
    }
}