const key = 'cccce1eca9eb8277da570d64f8ca9c6a';
var url = 'http://api.positionstack.com/v1/forward?access_key='+key+'&query=';

var btn = document.getElementById('btn_coord');

btn.addEventListener('click', function(){ getCoordinate()});

// Function gets user input adress and turns it to coordinates
function getCoordinate(){
    var inputAdress = document.getElementById('adress').value;
    console.log(inputAdress)
    
    // Create GET url to positionstack
    var searchURL = url+inputAdress;
    console.log(searchURL)
    makeFetch(searchURL)
}
// this function currently just enters values into document
function makeFetch(URL){
    fetch(URL).then(resp => resp.json()).then(data => {
        console.log(data)
        let tempValue = data.data[0].latitude
        let temp2 = data.data[0].longitude
        console.log(tempValue, 'lat')
        console.log(temp2, 'long')
        document.getElementById('long').value = temp2;
        document.getElementById('lat').value = tempValue;
    })
}