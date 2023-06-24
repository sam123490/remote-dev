import {
    state,
    bookmarksBtnEl,
    jobDetailsEl,
    jobListBookmarksEl
} from '../common.js';
import renderJobList from './JobList.js';

const clickHandler = event => {
    // stop if intention wasn not to bookmark
    if (!event.target.className.includes('bookmark')) return;

    // update state
    if (state.bookmarkJobItems.some(bookmarkJobitem => bookmarkJobitem.id === state.activeJobItem.id)) {
        state.bookmarkJobItems = state.bookmarkJobItems.filter(bookmarkJobitem => bookmarkJobitem.id !== state.activeJobItem.id);
    } else {
        state.bookmarkJobItems.push(state.activeJobItem);
    }

    // persist data with local storage (not session)
    localStorage.setItem('bookmarkJobItems', JSON.stringify(state.bookmarkJobItems));

    //update bookmark item
    document.querySelector('.job-info__bookmark-icon').classList.toggle('job-info__bookmark-icon--bookmarked');
};

const mouseEnterHandler = () => {
    // make bookmarks button look active
    bookmarksBtnEl.classList.add('bookmarks-btn--active');

    // make job list visible
    jobListBookmarksEl.classList.add('job-list--visible');

    // render bookmakrs job list
    renderJobList('bookmarks');
};

const mouseLeaveHandler = () => {
    // make bookmarks button look unactive
    bookmarksBtnEl.classList.remove('bookmarks-btn--active');

    // make job list invisible
    jobListBookmarksEl.classList.remove('job-list--visible');
};

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);