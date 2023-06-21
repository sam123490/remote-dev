import {
    searchInputEl,
    searchFormEl,
    spinnerSearchEl,
    jobListSearchEl,
    numberEl
} from '../common.js'

const submitHandler = event => {
    //prevent default behavior
    event.preventDefault();

    //get search text
    const searchText = searchInputEl.value.toLowerCase().trim();

    //validation (regular expression)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        errorTextEl.textContent = 'Your search may not contain numbers';
        errorEl.classList.add('error--visible');
        setTimeout(() => {
            errorEl.classList.remove('error--visible');
        }, 4000);
    }

    // blur input
    searchInputEl.blur();

    // remove provious job items before searching again
    jobListSearchEl.innerHTML = '';

    //show spinner
    spinnerSearchEl.classList.add('spinner--visible');

    //fetch search results
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
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
            spinnerSearchEl.classList.remove('spinner--visible');

            //render number of results
            numberEl.textContent = jobItems.length;

            //render job items
            jobItems.slice(0, 7).forEach(jobItem => {
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
        })
        .catch(error => {
            console.log(`There was an error. Error message: ${error.message}`);
        });
};

searchFormEl.addEventListener('submit', submitHandler);