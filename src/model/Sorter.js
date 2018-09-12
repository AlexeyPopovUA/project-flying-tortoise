export default class Sorter {
    /**
     * @param {string} key
     * @param {string} direction
     */
    constructor(key, direction = Sorter.DIRECTION.DESC) {
        this.key = key;
        this.direction = direction;
    }
}

Sorter.DIRECTION = {
    ASC: "asc",
    DESC: "desc"
};