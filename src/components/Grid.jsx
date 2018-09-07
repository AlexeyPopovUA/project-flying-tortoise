import "./../../styles/components/Grid.scss";
import "bootstrap/scss/bootstrap.scss";

export default class Grid {
    /**
     * @param {{store: Store}} config
     */
    constructor(config) {
        this.config = config;
    }

    render() {
        const list = this.config.store.getData();
        return (
            <div className="table-wrapper-scroll-y">
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
            </div>
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