import search from './redditapi';
import redditapi from './redditapi';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');



searchForm.addEventListener('submit', e=> {
    // get search term
    const searchTerm = searchInput.value;
    // get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // get limit
    const searchLimit =document.getElementById('limit').value;

    // check for input
    if(searchTerm ==='') {
        showMessage('Please add a search term', 'alert-danger')
    }

    // clear seach input
    searchInput.value ='';

    // search reddit
    redditapi.search(searchTerm,searchLimit,sortBy)
    .then(results => {
        console.log(results)
        let output = '<div class = "card-columns">';
        results.forEach(post => {

            // check for image
            const image = post.preview ? post.preview.images[0]
            .source.url :
            'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
            output += `<div class="card" >
            <img src="${image} " class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">
              ${truncateText(post.selftext, 100)}</p>
              <a href="${post.url}" target = _blank class="btn btn-primary">Read More</a>
            </div>
          </div>`;
        })
         output += '</div>'
         document.getElementById('results').innerHTML=output;
    })
    ;
    
    e.preventDefault()
})

// show message when no search term is entered
const showMessage = (message,className) => {

    // create div
    const div = document.createElement('div');

    // create bootsrap class for alert
    div.className =`alert ${className}`;
    // add alert text
    div.appendChild(document.createTextNode(message));
    // get the parent container to be able to put it above it
    const searchContainer = document.getElementById('search-container')

    // insert message
    searchContainer.insertBefore(div,search);
    
    // time out the alert div
    setTimeout(()=> document.querySelector('.alert').remove(),3000)
    

}


// truncate text

const truncateText =(text, limit) => {
    const shortened = text.indexOf(' ', limit);

    if(shortened == -1) return text;
    return text.substring(0, shortened);

}
