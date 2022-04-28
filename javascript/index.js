
/** Global Variables **/
let cleats = [];


//** Node Getters **/

const mainDiv = () => document.getElementById("main");
const homeLink = () => document.getElementById("home-link");
const createFootwearLink = () => document.getElementById("footwear-link")
const searchInput = () => document.querySelector("#search_cleat")
const searchForm = () => document.getElementById("search-form")
const cleatsList = () => document.getElementById("cleatsList")
const header = document.getElementById("header")



/** Event Listeners **/
const homeLinkClick = () => {
    homeLink().addEventListener("click", loadHome);
}

const attachFootwearEvent = () => {
    createFootwearLink().addEventListener("click", loadFootwear)
}

const searchSubmit = () => {
    searchForm().addEventListener("keyup", handleSearch)
}


//** Event Handlers **/

const loadHome = (event) => {
    if (event) {
        event.preventDefault()
    }

    renderMainDiv();
    
    renderHomeHeaderDiv();

    renderHomePageCleats(cleats);
};

const loadHomeCleats = (cleat) => {
    const div = document.createElement("div")
    div.className = "col s12 m4"

    div.innerHTML = `
        <div class="card">
    <div class="card-image">
        <img src="${cleat.img}">      
    </div>
    <div class="card-content">
        <h3>${cleat.title}</h3>
    </div>
    </div>
    `
    mainDiv().appendChild(div)
}

const loadFootwear = (event) => {
    event.preventDefault();

    renderMainDiv();

    renderFootwearHeaderDiv();

    renderCleatType();
};

const handleSearch = (event) => {
    const searchString = event.target.value.toLowerCase()
    const filteredSoccerCleats = cleats.filter(cleat => {
        return (
            cleat.title.toLowerCase().includes(searchString) ||
            cleat.type.toLowerCase().includes(searchString)
        )
    });
    console.log(filteredSoccerCleats)

    renderHomePageCleats(filteredSoccerCleats)
};

const handleItemClick = (category) => {
    renderMainDiv();
    console.log(category)
    const searchString = category.toLowerCase()
    const filteredSoccerCleats = cleats.filter(cleat => {
        return (
            cleat.title.toLowerCase().includes(searchString) ||
            cleat.type.toLowerCase().includes(searchString)
        )
    });
    console.log(filteredSoccerCleats)

    renderHomePageCleats(filteredSoccerCleats)
}


//** MISC **//
const renderFootwearHeaderDiv = () => {
    
    mainDiv().innerHTML = "";

    const h1 = document.createElement("h1");
    const div = document.createElement("div");

    h1.className = "center-align"
    div.className = "collection"

    h1.textContent = "Firm Ground Cleats"
    
    header.innerHTML = "";

    header.appendChild(h1);
    header.appendChild(div);
    
}

const renderHomeHeaderDiv = () => {
    mainDiv().innerHTML = ""
    const h1 = document.createElement("h1")
    const p = document.createElement("p")

    h1.className = "center-align";
    p.className = "center-align";

    h1.textContent = "The Cleat Showroom"

    p.textContent = "Welcome to the Cleat Showroom! If you are looking for the best possible cleat for you, then you have come to the right place! You will see reviews from people from all over the world! Once you select which cleats you want, visit Eurosport's Website and purchase them!"

    header.innerHTML = ""

    mainDiv().appendChild(h1)
    mainDiv().appendChild(p);
}

const renderMainDiv = () => {
    mainDiv().innerHTML = "";
};

const renderHomePageCleats = (displayCleats) => {
    renderMainDiv()
    renderHomeHeaderDiv()
    displayCleats.forEach(cleat => loadHomeCleats(cleat)) 
    
}

const renderCleatType = () => {
    const nonUniqCategories = cleats.map(cleat => cleat.type)
    const uniqCategories = nonUniqCategories.filter((category, index, array) => {
        let idx = array.indexOf(category)
        return idx === index
    });
    uniqCategories.forEach(category => renderCategory(category))
    console.log(uniqCategories)
};

const randomImgFromCategory = type => {
    const filteredCleats = cleats.filter(cleat => cleat.type === type);
    const index = Math.floor(Math.random() * filteredCleats.length);
    return filteredCleats[index].img
}

const renderCategory = category => {
    const div = document.createElement("div")
    div.className = "col s12 m4"
    div.addEventListener("click", () => handleItemClick(category))

    const imgUrl = randomImgFromCategory(category)

    div.innerHTML = `
    <div class="card">
    <div class="card-image">
        <img src="${imgUrl}">      
    </div>
    <div class="card-content">
        <h3>${category}</h3>
    </div>
    </div>
    `

    mainDiv().appendChild(div)
};

/** REQUESTS **/
const loadCleats = () => {
    fetch("http://localhost:3000/Cleats")
        .then(response => response.json())
        .then(data => {
            cleats = data
        })
};



//** Start Up **/

document.addEventListener("DOMContentLoaded", function () {
    loadCleats();
    loadHome();
    homeLinkClick();
    attachFootwearEvent();
    searchSubmit();
});
