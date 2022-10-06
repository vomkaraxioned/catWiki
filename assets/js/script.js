/* Author: 
omkar valve
*/
//global constant variables declared and assigned here
const searchField = document.querySelector(".search-field"),
topSearchUl = document.querySelector(".top-searched-breeds"),
breedDeatails = document.querySelector(".cat-breed-info .wrapper"),
url = "https://api.thecatapi.com/v1/breeds";
//xmlhttp object created here
xmlHttpObj = new XMLHttpRequest();
let apiData,breed;

xmlHttpObj.onreadystatechange = function () {
    try {
        if(this.readyState == 4 && this.status == 200){
            apiData = JSON.parse(this.responseText);
        }else {
            throw this.status + ":"+ this.statusText;
        }
    } catch (error) {
        apiData = error;
    }
}
xmlHttpObj.open("get",url);
xmlHttpObj.setRequestHeader("x-api-key","live_8a62s5Wi3WavotreFXMViJoZAtCASlUBrg0theNVTlEa5Gzknkzef1549FExxwIT");
xmlHttpObj.send();

if(searchField) {
    let inputBox = searchField.children[0];
   inputBox.addEventListener("keyup",suggest);
}

function suggest() {
    let suggestData = [],breedName,matched;
    const suggestionBox = document.querySelector(".suggestion"),
    key = this.value.toLowerCase().trim();
    for(x in apiData) { 
        breedName = apiData[x].name.toLowerCase();
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
            alert(breed);
            location.href = "description.html";
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
