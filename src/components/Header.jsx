import "./../../styles/components/Header.scss";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/js/src/collapse.js";

export default class Header {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <form className="form-inline my-2 my-md-0">
                        <input className="form-control" type="text" placeholder="Search"/>
                    </form>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#collapsable-menu-button"
                            aria-controls="collapsable-menu-button" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsable-menu-button">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <div className="rating-badge">1</div>
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    <div className="rating-badge">2</div>
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <div className="rating-badge">3</div>
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <div className="rating-badge">4</div>
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <div className="rating-badge">5</div>
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}