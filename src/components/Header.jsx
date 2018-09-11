import "./../../styles/components/Header.scss";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/js/src/collapse.js";
import EventEmitter from 'events';
import throttle from "lodash/throttle";
import sortedIndex from "lodash/sortedIndex";

const supportedRatings = [1, 2, 3, 4, 5];

export default class Header extends EventEmitter {
    constructor() {
        super();
        /**
         * @type {HTMLElement}
         */
        this.el = null;
        /**
         * Keeps the state of rating filters
         * @type {number[]}
         */
        this.enabledRatings = supportedRatings.slice();
    }

    render() {
        this.el = (
            <header className="header">
                <nav className="navbar navbar-expand-sm navbar-light">
                    <form className="form-inline my-2 my-md-0">
                        <input className="form-control comment-search" type="text" placeholder="Search here!"/>
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
            <div className={`rating-item rating-badge ${this.enabledRatings.includes(rating) ? "active" : ""}`}
                 data-rating={rating}>{rating}</div>
        );
    }

    addEventListeners() {
        this.el.querySelector(".rating-list").addEventListener("click", event => {
            event.stopPropagation();
            event.preventDefault();

            const ratingEl = event.target.closest(".rating-item");

            if (ratingEl) {
                this.updateEnabledFilters(parseInt(ratingEl.dataset.rating));
            }
        });

        const throttledCommentChange = throttle(this.emit.bind(this, "filters-changed"), 200, {
            leading: false,
            trailing: true
        });
        this.el.querySelector(".comment-search").addEventListener("input", throttledCommentChange);
    }

    /**
     * Saves the state of rating filter
     * @param filterValue
     */
    updateEnabledFilters(filterValue) {
        if (this.enabledRatings.includes(filterValue)) {
            this.enabledRatings.splice(this.enabledRatings.indexOf(filterValue), 1);
        } else {
            this.enabledRatings.splice(sortedIndex(this.enabledRatings, filterValue), 0, filterValue);
        }

        //when nothing is active - reset to "all active"
        if (this.enabledRatings.length === 0) {
            this.enabledRatings = supportedRatings.slice();
        }

        this.updateFilterUsage();
        this.emit("filters-changed");
    }

    /**
     * Refreshes state of filters on UI
     */
    updateFilterUsage() {
        const ratingFilterElList = this.el.querySelectorAll(".rating-list .rating-item");
        const cls = "active";

        ratingFilterElList.forEach(el => this.enabledRatings.includes(parseInt(el.dataset.rating)) ?
            el.classList.add(cls) : el.classList.remove(cls));
    }

    /**
     * Returns filters values
     * @returns {{ratings: number[] | *, search: *}}
     */
    getValues() {
        return {
            ratings: this.enabledRatings,
            search: this.el.querySelector(".comment-search").value
        };
    }
}