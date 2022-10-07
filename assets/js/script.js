/* Author: 
omkar valve
*/

//global constant variables declared and assigned here

let result, searchInput;
const searchField = document.querySelector(".search-field"),
    breedDetails = document.querySelector(".cat-breed-info .wrapper"),
    searchBtn = document.querySelector(".search-field-btn"),
    topSearch = document.querySelector(".top-searched-breeds"),
    url = "https://api.thecatapi.com/v1/breeds",
    xmlHttpObj = new XMLHttpRequest();

//moreImages function in which data is fetched for  gallery images parameters url(string),breedInfo(obj)

function moreImages(apiUrl, breedInfo) {
    const xmlHttpObj = new XMLHttpRequest();
    xmlHttpObj.onload = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                addPhotos(breedInfo, JSON.parse(this.responseText), true);
            } else {
                throw this.status + ":" + this.statusText;
            }
        } catch (error) {
            addPhotos(breedInfo, error, false);
        }
    }
    xmlHttpObj.open("GET", apiUrl);
    xmlHttpObj.setRequestHeader("x-api-key", "live_8a62s5Wi3WavotreFXMViJoZAtCASlUBrg0theNVTlEa5Gzknkzef1549FExxwIT");
    xmlHttpObj.send();
}

//addSummary function add top4 cat summary in home page

function addSummary() {
    const breedsUl = document.querySelector(".most-searched-breeds .cat-breeds"),
        limit = 4;
    let i = 0;
    breedsUl.innerHTML = "";
    while (i < limit) {
        const li = document.createElement("li"),
            figure = document.createElement("figure"),
            img = document.createElement("img"),
            a = document.createElement("a");
        li.classList.add("cat-breed");
        img.src = result[i].image.url;
        img.alt = a.innerText = a.title = result[i].name;
        a.href = "description.html";
        figure.appendChild(img);
        li.appendChild(figure);
        li.appendChild(a);
        li.addEventListener("click", function () {
            breed = this.children[1].innerText;
            location.href = "description.html?" + breed;
        });
        breedsUl.appendChild(li);
        i++;
    }
}

//suggestion function show suggestion related to user function

function suggest() {
    let suggestData = [], breedName, matched;
    const key = this.value.toLowerCase().trim();
    if (innerWidth < 541) {
        suggestionBox = document.querySelector(".search-modal .suggestion")
    } else {
        suggestionBox = document.querySelector(".suggestion");
    }
    if (key != "") {
        for (x in result) {
            breedName = result[x].name.toLowerCase();
            matched = true;
            for (x in key) {
                if (key[x] != breedName[x]) {
                    matched = false;
                    break;
                }
            }
            if (matched) {
                suggestData.push(breedName);
            }
        }
    }
    if (suggestData.length > 0) {
        appendToSuggestionBox(suggestData, suggestionBox);
    } else {
        toggleClasses(suggestionBox, "sugesstion-active", "suggestion-deactivate");
    }
    document.body.addEventListener("click", function (e) {
        toggleClasses(suggestionBox, "sugesstion-active", "suggestion-deactivate");
        searchField.children[0].value = "";
    });
}

//appendSuggestion function accepts parameter as suggestedData(arr),suggestionBox(element node)

function appendToSuggestionBox(data, suggestionBox) {
    suggestionBox.innerHTML = "";
    for (x in data) {
        const li = document.createElement("li");
        li.classList.add("suggest");
        li.innerText = data[x];
        li.addEventListener("click", function () {
            breed = this.innerText;
            location.href = "description.html?" + breed;
        });
        suggestionBox.appendChild(li);
    }
    toggleClasses(suggestionBox, "suggestion-deactivate", "suggestion-active");
}

//toggleclasses function accepts parameter as  suggestionbox(element node),classname_to_remove(str),classname_to_add(str)

function toggleClasses(element, remove, add) {
    element.classList.remove(remove);
    element.classList.add(add);
}

//addTopSearch function add top10 breeds 

function addTopSearch() {
    const limit = 10;
    let i = 0;
    topSearch.innerHTML = "";
    while (i < limit) {
        const li = document.createElement("li"),
            figure = document.createElement("figure"),
            img = document.createElement("img"),
            div = document.createElement("div"),
            h3 = document.createElement("h3"),
            p = document.createElement("p");
        li.classList.add("breed");
        div.classList.add("breed-info");
        h3.classList.add("breed-name");
        p.classList.add("description");
        img.src = result[i].image.url;
        img.alt = h3.innerText = result[i].name;
        p.innerText = result[i].description;
        figure.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        li.appendChild(figure);
        li.appendChild(div);
        li.addEventListener("click", function () {
            breed = this.children[1].children[0].innerText;
            location.href = "description.html?" + breed;
        });
        topSearch.appendChild(li);
        i++;
    }

}

//add photos function add more images of breed parameters breedInfo(obj),images(fetched arr or string),check(boolean)

function addPhotos(breedInfo, images, check) {
    const breedGallery = document.querySelector(".photos"), limit = 8;
    let i = 0;
    breedGallery.innerHTML = "";
    if (check) {
        while (i < limit) {
            const li = document.createElement("li"),
                img = document.createElement("img");
            li.classList.add("photo");
            img.src = images[i].url;
            img.alt = breedInfo.name;
            li.appendChild(img);
            breedGallery.appendChild(li);
            i++;
        }
    } else {
        breedGallery.innerText = images;
    }

}

//showBreedDetails function add breed details

function showBreedDetails() {
    breedDetails.innerHTML = "";
    const figure = document.createElement("figure"),
        img = document.createElement("img"),
        div = document.createElement("div"),
        h2 = document.createElement("h2"),
        p = document.createElement("p"),
        ul = document.createElement("ul"),
        breed = document.URL.replace("%20", " ").split("?").pop(),
        parameters = ["temperament", "origin", "life span", "adaptability", "affection Level", "Child Friendly", "Grooming", "Intelligence", "Health Issues", "Social Needs", "Stranger Friendly"];
    let breedInfo, values;
    for (x in result) {
        if (breed == result[x].name) {
            breedInfo = result[x];
        }
    }
    if (breedInfo) {
        values = [breedInfo.temperament, breedInfo.origin, breedInfo.life_span, breedInfo.adaptability, breedInfo.affection_level, breedInfo.child_friendly, breedInfo.grooming, breedInfo.intelligence, breedInfo.health_issues, breedInfo.social_needs, breedInfo.stranger_friendly];
        div.classList.add("cat-breed-details");
        h2.classList.add("title");
        p.classList.add("description");
        ul.classList.add("breed-details");
        img.src = breedInfo.image.url;
        img.alt = h2.innerText = breedInfo.name;
        p.innerText = breedInfo.description;
        for (x in parameters) {
            const li = document.createElement("li"),
                span = document.createElement("span");
            li.classList.add("detail");
            span.innerText = parameters[x] + ":";
            if (x > 2) {
                const ul = document.createElement("ul");
                ul.classList.add("ratings");
                let i = 0;
                while (i < 5) {
                    const li = document.createElement("li");
                    if (i < values[x]) {
                        li.classList.add("rate-active");
                    } else {
                        li.classList.add("rate");
                    }
                    ul.appendChild(li);
                    i++;
                }
                li.appendChild(ul);
            } else {
                if (x == 2) {
                    li.innerText = values[x] + "\tYears";
                } else {
                    li.innerText = "\t" + values[x];
                }
            }
            li.prepend(span);
            ul.appendChild(li);
        }
        figure.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(ul);
        breedDetails.appendChild(figure);
        breedDetails.appendChild(div);
        moreImages("https://api.thecatapi.com/v1/images/search?limit=8&" + breed, breedInfo);
    } else {
        breedDetails.innerText = err;
    }
}

//modal function add modal for mobile devices

function modal() {
    const modal = document.createElement("div"),
        div = document.createElement("div"),
        span = document.createElement("span");
    modal.classList.add("search-modal");
    div.classList.add("search-field");
    span.classList.add("icon");
    div.innerHTML = searchInput;
    modal.append(span);
    modal.appendChild(div);
    modal.children[1].children[0].addEventListener("keyup", suggest);
    modal.addEventListener("click", function (e) {
        if (e.target == this.children[0] || e.target == modal) {
            document.body.removeChild(modal);
            document.children[0].classList.remove("remove-scroll");
        }
    });
    document.body.appendChild(modal);
    document.children[0].classList.add("remove-scroll");
}

//loadElements is called when data is fetched successfully

function loadElements() {
    if (searchField) {
        addSummary();
        const inputBox = searchField.children[0];
        searchInput = searchField.innerHTML;
        inputBox.addEventListener("keyup", suggest);
    }

    if (breedDetails) {
        showBreedDetails();
    }

    if (topSearch) {
        addTopSearch();
    }

    if (searchBtn) {
        searchBtn.children[0].addEventListener("click", modal);
    }


}

//xmlHttpobj fetch data when loaded
xmlHttpObj.onload = function () {
    try {
        if (this.readyState == 4 && this.status == 200) {
            result = JSON.parse(this.responseText);
            loadElements();
        } else {
            throw this.status + ":" + this.statusText;
        }
    } catch (error) {
        if (breedDetails) {
            breedDetails.innerText = error;
        }
        if (topSearch) {
            topSearch.innerText = error;
        }
    }
}
xmlHttpObj.open("GET", url);
xmlHttpObj.setRequestHeader("x-api-key", "live_8a62s5Wi3WavotreFXMViJoZAtCASlUBrg0theNVTlEa5Gzknkzef1549FExxwIT");
xmlHttpObj.send();