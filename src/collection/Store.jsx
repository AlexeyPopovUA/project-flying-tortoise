import Filter from "./../model/Filter";

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
        const sameFilter = this._filters.find(item => item.key === filter.key);

        if (sameFilter) {
            if (sameFilter.value !== filter.value) {
                sameFilter.value = filter.value;
                this._applyFilters();
            }
        } else {
            this._filters.push(filter);
            this._applyFilters();
        }
    }

    _applyFilters() {
        let newData = this._originalData.slice();

        this._filters.forEach(filter => {
            newData = newData.filter(item => {
                if (filter.type === Filter.TYPE.EQUALS) {
                    return item[filter.key] === filter.value;
                } else if (filter.type === Filter.TYPE.CONTAINS) {
                    return `${item[filter.key]}`.includes(filter.value);
                } else {
                    //unknown filter type
                    return false;
                }
            })
        });

        this.data = newData;
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