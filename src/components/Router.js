import {
    BASE_API_URL,
    state,
    jobDetailsContentEl,
    getData
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderJobList from './JobList.js';

const loadHashChangeHandler = async () => {
    //get id from url
    const id = window.location.hash.substring(1);

    if (id) {
        // remove active class from previously selected job items
        document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveCLass => jobItemWithActiveCLass.classList.remove('job-item--active'));

        // remove preovious job details content
        jobDetailsContentEl.innerHTML = '';

        //add spinner
        renderSpinner('job-details');

        try {
            //fetch the job items data
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    
            // using destructuring
            const { jobItem } = data;
                    
            // update state
            state.activeJobItem = jobItem;

            // render job list
            renderJobList();

            // remove spinner
            renderSpinner('job-details');
    
            // render job item onto our HTML
            renderJobDetails(jobItem);
        } catch (error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);