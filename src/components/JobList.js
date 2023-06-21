import {
    BASE_API_URL,
    getData,
    jobListSearchEl,
    jobDetailsContentEl,
    state
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

const renderJobList = () => {
    // remove previous job results
    jobListSearchEl.innerHTML = '';

    // display most recent results
    state.searchJobItems.slice(0, 7).forEach(jobItem => {
        const newJobItemHTML = `
            <li class="job-item">
                <a class="job-item__link" href="${jobItem.id}">
                    <div class="job-item__badge">${jobItem.badgeLetters}</div>
                    <div class="job-item__middle">
                        <h3 class="third-heading">${jobItem.title}</h3>
                        <p class="job-item__company">${jobItem.company}</p>
                        <div class="job-item__extras">
                            <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                            <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                        </div>
                    </div>
                    <div class="job-item__right">
                        <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                        <time class="job-item__time">${jobItem.daysAgo}d</time>
                    </div>
                </a>
            </li>
        `;
        jobListSearchEl.insertAdjacentHTML('beforeend', newJobItemHTML);
    });
};

const clickHandler = async event => {
    // prevent default behaviour
    event.preventDefault();

    // get clicked item element
    const jobItemEl = event.target.closest('.job-item');

    // remove active class from previously selected job item
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');

    //add active class
    jobItemEl.classList.add('job-item--active');

    // remove job details section
    jobDetailsContentEl.innerHTML = '';

    // add spinner
    renderSpinner('job-details');

    // get the id of clicked job item
    const id = jobItemEl.children[0].getAttribute('href');

    try {
        //fetch the job items data
        const data = await getData(`${BASE_API_URL}/jobs/${id}`);

        // using destructuring
        const { jobItem } = data;
                
        // remove spinner
        renderSpinner('job-details');

        // render job item onto our HTML
        renderJobDetails(jobItem);
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }
};

jobListSearchEl.addEventListener('click', clickHandler);

export default renderJobList;