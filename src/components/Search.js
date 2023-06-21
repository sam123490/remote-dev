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


const submitHandler = event => {
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
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) {
                console.log('Something went wrong!');
                return;
            }

            return response.json();
        })
        .then(data => {
            // using destructuring
            const { jobItems } = data;

            //remove spinner
            renderSpinner('search');

            //render number of results
            numberEl.textContent = jobItems.length;

            //render job items
            renderJobList(jobItems);
        })
        .catch(error => {
            console.log(`There was an error. Error message: ${error.message}`);
        });
};

searchFormEl.addEventListener('submit', submitHandler);