import {
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';


const submitHandler = async event => {
    //prevent default behavior
    event.preventDefault();

    //get search text
    const searchText = searchInputEl.value.toLowerCase().trim();

    //validation (regular expression)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    // blur input
    searchInputEl.blur();

    // remove provious job items before searching again
    jobListSearchEl.innerHTML = '';

    //show spinner
    renderSpinner('search');
    
    //fetch search results
    try {
        const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.description);
        }

        // using destructuring
        const { jobItems } = data;

        //remove spinner
        renderSpinner('search');

        //render number of results
        numberEl.textContent = jobItems.length;

        //render job items
        renderJobList(jobItems);
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }
};

searchFormEl.addEventListener('submit', submitHandler);