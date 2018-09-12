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
        //todo Use an svg instead of string
        const img = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNIDEyIDEgQyA1LjM2NDQ4MDkgMSAwIDYuMzY0NDgwOSAwIDEzIEMgMCAxNS41MDI4OTkgMC43NjA4MjE4NSAxNy44OTk1OTkgMi4xODc1IDE5Ljg3NSBMIDMuODEyNSAxOC43MTg3NSBDIDMuNzQ1OTk4IDE4LjYyNjY3IDMuNjg4MDUxMSAxOC41MzE5MjMgMy42MjUgMTguNDM3NSBMIDUuMzQzNzUgMTcuNDM3NSBMIDQuODQzNzUgMTYuNTYyNSBMIDMuMDkzNzUgMTcuNTYyNSBDIDIuNDUyMzc3OSAxNi4zMjkyMjMgMi4xMDE3MTk2IDE0Ljk0MDk4OCAyLjAzMTI1IDEzLjUgTCA0IDEzLjUgTCA0IDEyLjUgTCAyLjAzMTI1IDEyLjUgQyAyLjEwMjA2NSAxMS4wMzc2OTEgMi40NzAzNDAxIDkuNjYxMTgxIDMuMDkzNzUgOC40Mzc1IEwgNC44NDM3NSA5LjQzNzUgTCA1LjM0Mzc1IDguNTYyNSBMIDMuNTkzNzUgNy41MzEyNSBDIDQuMzU3MDI5OSA2LjM1NTY2MzcgNS4zODI5NDc5IDUuMzgzOTc0MSA2LjU2MjUgNC42MjUgTCA3LjU2MjUgNi4zNDM3NSBMIDguNDM3NSA1Ljg0Mzc1IEwgNy40Mzc1IDQuMTI1IEMgOC42Njc1ODQ5IDMuNDk5MzMyMSAxMC4wMzEyNDMgMy4xMDIzMjQ4IDExLjUgMy4wMzEyNSBMIDExLjUgNSBMIDEyLjUgNSBMIDEyLjUgMy4wMzEyNSBDIDEzLjk2ODc1NyAzLjEwMjMyNDggMTUuMzMyNDE1IDMuNDk5MzMyMSAxNi41NjI1IDQuMTI1IEwgMTUuNTYyNSA1Ljg0Mzc1IEwgMTYuNDM3NSA2LjM0Mzc1IEwgMTcuNDM3NSA0LjYyNSBDIDE4LjYxNzA1MiA1LjM4Mzk3NDEgMTkuNjQyOTcgNi4zNTU2NjM3IDIwLjQwNjI1IDcuNTMxMjUgTCAxOS44NDM3NSA3Ljg3NSBMIDIwLjM0Mzc1IDguNzE4NzUgTCAyMC45MDYyNSA4LjQwNjI1IEMgMjEuNTM3NTE5IDkuNjM2NDEzNSAyMS44OTc0MzcgMTEuMDI3Mzk3IDIxLjk2ODc1IDEyLjUgTCAyMCAxMi41IEwgMjAgMTMuNSBMIDIxLjk2ODc1IDEzLjUgQyAyMS45MDIxIDE1LjAwMjE4IDIxLjUzMzU1NyAxNi4zNzgwNTUgMjAuOTA2MjUgMTcuNTYyNSBMIDE5LjE1NjI1IDE2LjU2MjUgTCAxOC42NTYyNSAxNy40Mzc1IEwgMjAuMzc1IDE4LjQzNzUgQyAyMC4zMTg3OCAxOC41MTcwNDMgMjAuMjc3NzI2IDE4LjYxMDM3OCAyMC4yMTg3NSAxOC42ODc1IEwgMjEuNzgxMjUgMTkuOTA2MjUgQyAyMy4yMjg5MTMgMTguMDEzMTUzIDI0IDE1LjU5NDQ0NCAyNCAxMyBDIDI0IDYuMzY0NDgwOSAxOC42MzU1MTkgMSAxMiAxIHogTSAxOS41OTM3NSA4LjUgTCAxMy4wMzEyNSAxMS4zMTI1IEMgMTIuNzI4NzA5IDExLjEyODA0MSAxMi4zNzgzNDQgMTEgMTIgMTEgQyAxMC45IDExIDEwIDExLjkgMTAgMTMgQyAxMCAxNC4xIDEwLjkgMTUgMTIgMTUgQyAxMy4xIDE1IDE0IDE0LjEgMTQgMTMgQyAxNCAxMi45NTc5NDEgMTQuMDAyNTkyIDEyLjkxNjQzNSAxNCAxMi44NzUgTCAxOS42ODc1IDguNTkzNzUgTCAxOS41OTM3NSA4LjUgeiBNIDggMTkgTCA4IDIyIEwgMTYgMjIgTCAxNiAxOSBMIDggMTkgeiIvPgo8L3N2Zz4K\n"
        this.el = (
            <header className="header">
                <div className="dashboard-wrapper"><img className="dashboard-icon" src={img}/>&nbsp;&nbsp;&nbsp;<span>Dashboard</span></div>
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