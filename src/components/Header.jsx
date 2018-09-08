import "./../../styles/components/Header.scss";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/js/src/collapse.js";
import EventEmitter from 'events';

export default class Header extends EventEmitter {
    constructor() {
        super();
        this.el = null;
    }

    render() {
        this.el = (
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
                            {[1, 2, 3, 4, 5].map(rating => this.renderRatingItem(rating))}
                        </ul>
                    </div>
                </nav>
            </header>
        );

        this.addEventListeners();

        return this.el;
    }

    /**
     * @param {number} rating
     * @returns {HTMLElement}
     */
    renderRatingItem(rating) {
        return (
            <li className="nav-item">
                <a className="nav-link rating-item" href="#" data-rating={rating}>
                    <div className="rating-badge">{rating}</div>
                    <span className="sr-only">(current)</span>
                </a>
            </li>
        );
    }

    addEventListeners() {
        this.el.addEventListener("click", event => {
            event.stopPropagation();
            event.preventDefault();

            const ratingEl = event.target.closest(".rating-item");

            if (ratingEl) {
                this.emit("rating-selected", ratingEl.dataset.rating);
            }
        });
    }
}