/* Author: 
omkar valve
*/
//global constant variables declared and assigned here
let result,searchInput;
const searchField = document.querySelector(".search-field"),
topSearchUl = document.querySelector(".top-searched-breeds"),
breedDetails = document.querySelector(".cat-breed-info .wrapper"),
searchBtn = document.querySelector(".search-field-btn"),
topSearch = document.querySelector(".top-searched-breeds");
url = "https://api.thecatapi.com/v1/breeds",
//xmlhttp object created here
xmlHttpObj = new XMLHttpRequest();
    xmlHttpObj.onload= function () {
            if(this.readyState == 4 && this.status == 200){
              result =   JSON.parse(this.responseText);
              loadElements();
            }else {
                result = ""+this.status + ":"+ this.statusText+"";
            }
    }
    xmlHttpObj.open("GET",url);
    xmlHttpObj.setRequestHeader("x-api-key","live_8a62s5Wi3WavotreFXMViJoZAtCASlUBrg0theNVTlEa5Gzknkzef1549FExxwIT");
    xmlHttpObj.send();

    //addSummary function
function addSummary() {
    const breedsUl = document.querySelector(".most-searched-breeds .cat-breeds"),
    limit = 4;
    let i = 0;
    breedsUl.innerHTML = "";
   while(i<limit) {
    const li = document.createElement("li"),
    figure = document.createElement("figure"),
    img = document.createElement("img"),
    a = document.createElement("a");
    li.classList.add("cat-breed");
    img.src = result[i].image.url;
    img.alt = result[i].name;
    a.href = "description.html";
    a.title = result[i].name;
    a.innerText = result[i].name;
    figure.appendChild(img);
    li.appendChild(figure);
    li.appendChild(a);
    li.addEventListener("click",function () {
        breed = this.children[1].innerText;
        location.href = "description.html?"+breed;
    });
    breedsUl.appendChild(li);
    i++;
   }
}

//suggestion function
function suggest() {
    let suggestData = [],breedName,matched;
    const key = this.value.toLowerCase().trim();
    if(innerWidth < 541) {
        suggestionBox = document.querySelector(".search-modal .suggestion")
    }else {
        suggestionBox = document.querySelector(".suggestion");
    }
    for(x in result) { 
        breedName = result[x].name.toLowerCase();
        matched = true;
        for(x in key) {
            if(key[x] != breedName[x]) {
                matched = false;
                break;
            }
    }
    if(matched) { 
        suggestData.push(breedName);
    }
}
    if(suggestData.length >0) {
        appendToSuggestionBox(suggestData,suggestionBox);
    }else {
        toggleClasses(suggestionBox,"sugesstion-active","suggestion-deactivate");
    }
    document.body.addEventListener("click",function (e) {
        toggleClasses(suggestionBox,"sugesstion-active","suggestion-deactivate");
        searchField.children[0].value = "";
    });
}

//appendSuggestion method accepts parameter as suggestedDtata(arr),suggestionBox(element node)
function appendToSuggestionBox(data,suggestionBox) {
    suggestionBox.innerHTML = "";
    for(x in data) {
        const li = document.createElement("li");
        li.classList.add("suggest");
        li.innerText = data[x];
        li.addEventListener("click",function () {
            breed = this.innerText; 
            location.href = "description.html?"+breed;
        });
        suggestionBox.appendChild(li);
    }
    toggleClasses(suggestionBox,"suggestion-deactivate","suggestion-active");
}

//toggleclasses method accepts parameter as  suggestionbox(element node),classname(str),classname(str)
function toggleClasses(element,remove,add) {
    element.classList.remove(remove);
    element.classList.add(add);
}

//addTopSearch
function addTopSeach() {
    const limit = 10;
    let i = 0;
    topSearch.innerHTML = "";
  while(i < limit) {
    const  li = document.createElement("li"),
    figure = document.createElement("figure");
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
    li.addEventListener("click",function() {
            breed = this.children[1].children[0].innerText; 
            location.href = "description.html?"+breed;
    });
    topSearch.appendChild(li);
    i++;
  }

}

//add photos
function addPhotos(breedInfo) {
    const breedGallery = document.querySelector(".photos"),limit = 8;
    let i = 0; 
    breedGallery.innerHTML = "";
    while(i < limit) {
        const li = document.createElement("li"),
        img = document.createElement("img");
        li.classList.add("photo");
        img.src = breedInfo.image.url;
        img.alt = breedInfo.name;
        li.appendChild(img);
        breedGallery.appendChild(li);
        i++;
    }

}

//showBreedDetails
function showBreedDetails() {
    breedDetails.innerHTML = "";
    const figure = document.createElement("figure");
    img = document.createElement("img"),
    div = document.createElement("div"),
    h2 = document.createElement("h2"),
    p = document.createElement("p"),
    ul = document.createElement("ul"),
    breed = document.URL.split("?").pop(),
    parameters = ["temperament","life","adaptability","affection Level","Child Friendly",
    "Grooming","Intelligence","Health Issues","Social Needs","Stranger Friendly"];
    let breedInfo,values;
    for(x in result) {
        if(breed == result[x].name) {
            breedInfo = result[x];
            console.log(breedInfo);
        }
    }
    values = [breedInfo.temperament,breedInfo.life_span,breedInfo.adaptability,breedInfo.affection_level,breedInfo.child_friendly,breedInfo.grooming,breedInfo.intelligence,breedInfo.health_issues,breedInfo.social_needs,breedInfo.stranger_friendly];
    div.classList.add("cat-breed-details");
    h2.classList.add("title");
    p.classList.add("description");
    ul.classList.add("breed-details");
    img.src = breedInfo.image.url;
    img.alt = h2.innerText = breedInfo.name;
    p.innerText = breedInfo.description;
    for(x in parameters) {
       const li = document.createElement("li"),
       span = document.createElement("span");
       li.classList.add("detail");
       span.innerText = parameters[x]+":";
       if(x > 2) {
           const ul = document.createElement("ul");
           ul.classList.add("ratings");
           let i = 0;
           while(i < 5) {
               const li = document.createElement("li");
               if(i < values[x]) {
                   console.log(values[x]);
                   li.classList.add("rate-active");
                }else {
                    li.classList.add("rate");
                }
                ul.appendChild(li);
                i++;
            }
            li.appendChild(ul);
        }else {
            li.innerText ="\t"+ values[x];
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
    addPhotos(breedInfo);
}

function modal() {;
    const modal = document.createElement("div"),
    div = document.createElement("div"),
    span = document.createElement("span");
    modal.classList.add("search-modal");
    div.classList.add("search-field");
    span.classList.add("icon");
    div.innerHTML = searchInput;
    modal.append(span);
    modal.appendChild(div);
    modal.children[1].children[0].addEventListener("keyup",suggest);
    modal.addEventListener("click",function(e) {
     if(e.target == this.children[0]) {
        document.body.removeChild(modal);
     }
    });
    document.body.appendChild(modal);

}

function loadElements() {
    if(searchField) {
        addSummary();
        let inputBox = searchField.children[0];
        searchInput = searchField.innerHTML;
       inputBox.addEventListener("keyup",suggest);
    }  
    
    if(breedDetails) {
        showBreedDetails();
        console.log(result);
    }

    if(topSearch) {
        addTopSeach();
    }

    if(searchBtn) {
        searchBtn.children[0].addEventListener("click",modal);
    }

    
}
