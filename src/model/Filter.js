export default class Filter {
    /**
     * @param {string} key
     * @param {string|number} value
     * @param {string} type - filter type ("equals" or "contains")
     */
    constructor(key, value, type = Filter.TYPE.EQUALS) {
        /**
         * @type {string}
         */
        this.key = key;
        /**
         * @type {string|number}
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
    CONTAINS: "CONTAINS"
};