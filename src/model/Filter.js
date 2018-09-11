export default class Filter {
    /**
     * @param {string} key
     * @param {string|number} value
     * @param {string} type - setFilters type ("equals" or "contains")
     */
    constructor(key, value, type = Filter.TYPE.EQUALS) {
        /**
         * @type {string}
         */
        this.key = key;
        /**
         * @type {string|number|Array}
         */
        this.value = value;

        /**
         * "equals" or "contains"
         * @type {string}
         */
        this.type = type;
    }
}

Filter.TYPE = {
    EQUALS: "EQUALS",
    CONTAINS: "CONTAINS",
    IN_LIST: "IN_LIST"
};