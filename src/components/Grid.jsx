import "./../../styles/components/Grid.scss";
import "bootstrap/scss/bootstrap.scss";

export default class Grid {
    /**
     * @param {{store: Store}} config
     */
    constructor(config) {
        this.config = config;
        this.el = null;
    }

    render() {
        this.el = (
            <div className="table-wrapper-scroll-y">
                {this.renderTable(this.config.store.getData())}
            </div>
        );

        return this.el;
    }

    update() {
        if (this.el && this.el.firstChild) {
            const container = this.el.firstChild;
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }

            container.appendChild(this.renderTable(this.config.store.getData()));
        }
    }

    renderTable(list){
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

    renderRow(data) {
        return (
            <tr>
                <td><div className="rating-badge">{data.rating}</div></td>
                <td>{data.comment}</td>
                <td>{data.computed_browser.Browser}</td>
                <td>{data.computed_browser.Platform}</td>
                <td>{data.browser.platform}</td>
            </tr>
        );
    }
}