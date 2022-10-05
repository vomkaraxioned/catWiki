/* Author: 
omkar valve
*/
const url = " https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_8a62s5Wi3WavotreFXMViJoZAtCASlUBrg0theNVTlEa5Gzknkzef1549FExxwIT";
const xmlHttpObj = new XMLHttpRequest();
xmlHttpObj.onreadystatechange = function () {
    try {
        if(this.readyState == 4 && this.status == 200){
            console.log(JSON.parse(this.responseText));
        }else {
            throw this.status + ":"+ this.statusText;        }
    } catch (error) {
        console.log(error);
    }
}
xmlHttpObj.open("get",url);
xmlHttpObj.send();























