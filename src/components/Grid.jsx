import "./../../styles/components/Grid.scss";
import "bootstrap/scss/bootstrap.scss";

export default class Grid {
    /**
     * @param {{store: Store}} config
     */
    constructor(config) {
        this.config = config;
        /**
         * @type {HTMLElement}
         */
        this.el = null;
    }

    render() {
        this.el = (
            <div className="table-wrapper">
                {this.renderTable(this.config.store.getData())}
            </div>
        );

        return this.el;
    }

    /**
     * Re-renders the grid with fresh data
     */
    update() {
        if (this.el && this.el.firstChild) {
            const container = this.el.firstChild;
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }

            container.appendChild(this.renderTable(this.config.store.getData()));
        }
    }

    /**
     * @param {Array} list
     * @returns {HTMLElement}
     */
    renderTable(list) {
        return (
            <table className="table table-responsive-md">
                <thead>
                <tr>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Browser</th>
                    <th>Device</th>
                    <th>Platform</th>
                </tr>
                </thead>
                <tbody>
                {list.map(item => this.renderRow(item))}
                </tbody>
            </table>
        );
    }

    /**
     * todo Maybe, ot should use simple remapped data from model
     * @param data
     * @returns {*}
     */
    renderRow(data) {
        return (
            <tr>
                <td>
                    <div className="rating-badge">{data.rating}</div>
                </td>
                <td>{data.comment}</td>
                <td>{data.computed_browser.Browser}</td>
                <td>{data.computed_browser.Platform}</td>
                <td>{data.browser.platform}</td>
            </tr>
        );
    }
}