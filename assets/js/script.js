/* Author: 
omkar valve
*/
//global constant variables declared and assigned here
const searchField = document.querySelector(".search-field"),
topSearchUl = document.querySelector(".top-searched-breeds"),
breedDeatails = document.querySelector(".cat-breed-info .wrapper"),
//xmlhttp object created here
xmlHttpObj = new XMLHttpRequest();
let result;

function apiCall(url) {
    xmlHttpObj.onreadystatechange = function () {
        try {
            if(this.readyState == 4 && this.status == 200){
                result = JSON.parse(this.responseText);
            }else {
                throw this.status + ":"+ this.statusText;
            }
        } catch (error) {
            console.log(error);
        }
    }
    xmlHttpObj.open("get",url);
    xmlHttpObj.setRequestHeader("x-api-key","live_8a62s5Wi3WavotreFXMViJoZAtCASlUBrg0theNVTlEa5Gzknkzef1549FExxwIT");
    xmlHttpObj.send();
}

if(searchField) {
    let inputBox = searchField.children[0];
   inputBox.addEventListener("keyup",suggest);
}

function suggest() {
    let suggestData = [],breedName,matched;
    const key = this.value.toLowerCase();
    apiCall("https://api.thecatapi.com/v1/breeds");
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
appendToSuggestionBox(suggestData);
}

function appendToSuggestionBox(data) {
    const  suggestionBox = document.querySelector(".suggestion");
    // suggestionBox.innerHTML = "";
    for(x in data) {
        const li = document.createElement("li");
        li.classList.add("suggest");
        li.innerText = data[x];
        suggestionBox.appendChild(li);
    }
    suggestionBox.classList.add("suggestion-active");
}
