const key = 'cccce1eca9eb8277da570d64f8ca9c6a';
let urlPOS = 'http://api.positionstack.com/v1/forward?access_key='+key+'&query=';
let urlSMHI = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon//lat//data.json'
let btn = document.getElementById('button');
let coords = [];
const weatherStatus = {
    1:"Clear Sky",
    2:"Nearly clear sky",
    3:"Variable cloudiness",
    4:"Halfclear sky",
    5:"Cloudy sky",
    6:"Overcast",
    7:"Fog"
}


//Add an event listener to button
btn.addEventListener('click', function(){ startAPI();});

function startAPI(){
    let bool = false
    //get user input
    let inputAdress = document.getElementById('search-box').value;
    //Create url to positionstack
    urlToPositionstack = urlPOS+inputAdress;
    console.log(urlToPositionstack);

    fetch(urlToPositionstack).then(resp => resp.json())
        .then(data => {
            coords[0] = (data.data[0].latitude);
            coords[1] = (data.data[0].longitude);
            //name stored at index 3
            coords[2] = data.data[0].label;
            console.log(coords)
            // construct correct API url to SMHI
            urlSMHI = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'+coords[1]+'/lat/'+coords[0]+'/data.json';
            // start collecting data from smhi.
            getWeatherSMHI();

        })
        .catch(err => handelError(err))
    // if(coords.length>0){
    //     return true
    // }
    if(coords.length > 0){bool = true}
    return bool
}

function getWeatherSMHI(){
    console.log(urlSMHI)
    //Start fetch from SMHI
    fetch(urlSMHI).then(resp => resp.json())
        .then(data => {
            console.log(data)
            updateWeather(data)
        })
}

function updateWeather(data){
    document.getElementById('label'). innerHTML = coords[2]
    document.getElementById('temp').innerHTML = data.timeSeries[0].parameters[10].values[0];
    weatherSymbol =parseInt(data.timeSeries[0].parameters[18].values[0]);
    document.getElementById('weather').innerHTML = weatherStatus[weatherSymbol];

}

















// function startApiCall(){
//     // get user input and logs it to consloe for debugging
//     var inputAdress = document.getElementById('search-box').value;
//     console.log(inputAdress)
//     //Create the the correct URL to positionstack!
//     var urlToPsition = url + inputAdress;
//     console.log(urlToPsition);
//     //Start fetching data from Positionstack
//     let bool = convertAdressToCoords(urlToPsition)
//     let s = 1;
//     while(bool != true){
//         s++;
//     }
    
//     let coods = [longitude,latitude]
//     console.log('koordinater')
//     console.log(coods[0])
//     console.log(coods[1])

// }
// //Function takes in a URL for whitch it returns the coordinates from API call in an array
// function convertAdressToCoords(url) {
    
//     //start fetching from positionstack!
//     fetch(url)
//     //convert promise and respons to JSON
//     .then(
//         resp => resp.json()
//     )
//     .then(data => {
//         //Log the JSON data in the console!
//         console.log(data);
//         let long = data.data[0].longitude;
//         let lati = data.data[0].latitude;
//         // longitude = parseFloat(long);
//         // latitude = parseFloat(lati);
//         longitude = long;
//         latitude = lati;
//         //document.getElementById('text').innerHTML = long
        
//     })
//     .catch(err => handelError(err));
//     //Create array to be returned containing the longitude and latitude
    
//     let coords = new Array(latitude,longitude);
//     console.log(latitude)
//     console.log(coords[0])
//     return true;
// }

function handelError(err){
    console.log(err)
    alert('Something went wrong, make sure to type accurate!')
}