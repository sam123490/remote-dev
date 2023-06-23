import {
    RESULTS_PER_PAGE,
    state,
    paginationEl,
    paginationNumberNextEl,
    paginationNumberBackEl,
    paginationBtnNextEl,
    paginationBtnBackEl
} from '../common.js';
import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
    // display back button if we are on page 2 or more
    if (state.currentPage >= 2) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    //update page numbers
    paginationNumberNextEl.textContent = state.currentPage + 1;
    paginationNumberBackEl.textContent = state.currentPage - 1;

    //display next button if there are more job items on next page
    if ((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
    }

    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();
};

const clickHandler = event => {
    // get clicked El
    const clickedBtnEl = event.target.closest('.pagination__button');

    //stop function if a button wasn't clicked
    if (!clickedBtnEl) return;

    // check intention for next or back
    const nextPage = clickedBtnEl.className.includes('--next') ? true : false;

        //update state
    nextPage ? state.currentPage++ : state.currentPage--;

    //render pgaination buttons
    renderPaginationButtons();

    //render job items for current page
    renderJobList();

};

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons
