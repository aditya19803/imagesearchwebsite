const accesskey = "9Q0QBWT4Ub08IsmzgSUUL18L_-zQYAiBIg1WCFuJRLI";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchresult = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");

let inputdata = "";
let page = 1;

async function searchimages() {
    inputdata = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchresult.innerHTML = "";
    }

    results.forEach((result) => {
        const imagewrapper = document.createElement('div');
        imagewrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small; // Fix the URL here
        image.alt = result.alt_description; // Set alt attribute
        const imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "_blank"; // Set target attribute
        imagelink.textContent = result.alt_description;

        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imagelink);
        searchresult.appendChild(imagewrapper);
    });
    page++;

    if (page > 1) {
        showmore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchimages();
});

showmore.addEventListener("click", (event) => {
    page++; // Increment page before calling searchimages
    searchimages();
});
