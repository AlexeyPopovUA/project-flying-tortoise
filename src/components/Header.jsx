import "./../../styles/components/Header.scss";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/js/src/collapse.js";
import EventEmitter from 'events';
import throttle from "lodash/throttle";

const supportedRatings = [1, 2, 3, 4, 5];

export default class Header extends EventEmitter {
    constructor() {
        super();
        this.el = null;
    }

    render() {
        this.el = (
            <header className="header">
                <nav className="navbar navbar-expand-sm navbar-light">
                    <form className="form-inline my-2 my-md-0">
                        <input className="form-control comment-search" type="text" placeholder="Search"/>
                    </form>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#collapsable-menu"
                            aria-controls="collapsable-menu" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsable-menu">
                        <div className="rating-list">
                            {supportedRatings.map(rating => this.renderRatingItem(rating))}
                        </div>
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
            <div className="rating-item rating-badge" data-rating={rating}>{rating}</div>
        );
    }

    addEventListeners() {
        this.el.querySelector(".rating-list").addEventListener("click", event => {
            event.stopPropagation();
            event.preventDefault();

            const ratingEl = event.target.closest(".rating-item");

            if (ratingEl) {
                this.emit("rating-selected", ratingEl.dataset.rating);
            }
        });

        const throttledCommentChange = throttle(this.emit.bind(this, "comment-filter-change"), 200, {
            leading: false,
            trailing: true
        });
        this.el.querySelector(".comment-search").addEventListener("input", e => throttledCommentChange(e.target.value));
    }
}