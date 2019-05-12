export default {
    search: function(searchTerm,searchLimit,sortBy) {
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}
        &sort=${sortBy}&limit=${searchLimit}`)
        // first .then gives us the response, then we tell it we want the data in json
        .then(res => res.json())
        // this second .then actually gives us the data we requested
        .then(data => data.data.children.map(data =>
            data.data))
            .catch(err => console.log(err))
    }
}