import "./../../styles/components/Grid.scss";
import "bootstrap/scss/bootstrap.scss";

export default class Grid {
    /*constructor() {

    }*/

    render(data) {
        return (
            <div className="table-responsive">
                <table className="table table-sm">
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
                    <tr>
                        <td>1</td>
                        <td>Lorem</td>
                        <td>ipsum</td>
                        <td>dolor</td>
                        <td>sit</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>amet</td>
                        <td>consectetur</td>
                        <td>adipiscing</td>
                        <td>elit</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Integer</td>
                        <td>nec</td>
                        <td>odio</td>
                        <td>Praesent</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}