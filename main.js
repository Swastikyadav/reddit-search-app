// Chasing the dom.
let searchTerm = document.querySelector("#search");
let selectLimit = document.querySelector("select");
let searchBtn = document.querySelector("#searchBtn");
let posts = document.querySelector(".posts");

// Subscribing to click event on searchBtn.
searchBtn.addEventListener("click", (e) => {
    posts.innerHTML = "";
    e.preventDefault();
    
    // Creating elements for posts.
    createUI();
    searchTerm.value = "";
});

function createUI() {
    fetch(`http://www.reddit.com/search.json?q=${searchTerm.value}&limit=${selectLimit.value}`)
        .then(res => res.json())
        .then(data => {
            data.data.children.map((elm, index) => {
                let image = elm.data.preview
                ? elm.data.preview.images[0].source.url
                : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
                let title = elm.data.title;
                let url = elm.data.url;

                let card = document.createElement('div');
                card.classList.add("card");

                card.innerHTML = `
                <img src=${image} width='100%' height='200px'>
                <h5 class='post-title'>${title}</h5>
                <a href=${url}><p>Read More</p></a>
                `
                posts.appendChild(card);
                console.log(elm);
            });
        });
}