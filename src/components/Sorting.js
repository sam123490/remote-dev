import {
    state,
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

const clickHandler = event => {
    // get clicked button element
    const clickedBtnEl = event.target.closest('.sorting__button');

    // stop fucntion of button was not clicked
    if (!clickedBtnEl) return;

    //reset current page to first page
    state.currentPage = 1;

    // check if relevance or recency was clicked
    const recent = clickedBtnEl.className.includes('--recent') ? true : false;

    if (recent) {
        sortingBtnRecentEl.classList.add('sorting__button--active');
        sortingBtnRelevantEl.classList.remove('sorting__button--active');
    } else {
        sortingBtnRecentEl.classList.remove('sorting__button--active');
        sortingBtnRelevantEl.classList.add('sorting__button--active');
    }

    // sort job items
    if (recent) {
        state.searchJobItems.sort((a, b) => {
            return a.daysAgo - b.daysAgo;
        });
    } else {
        state.searchJobItems.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore;
        });
    }

    //reset paginatino buttons
    renderPaginationButtons();

    renderJobList(state.searchJobItems);
};

sortingEl.addEventListener('click', clickHandler);