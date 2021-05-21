let urlSMHI = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon//lat//data.json';
const keyLocationIQ = 'pk.12db4134342bdbfb7cd40926b200b663';
let urlLocationIQ = 'https://eu1.locationiq.com/v1/search.php?key='+keyLocationIQ+'&q=';


let btn = document.getElementById('button');
let searchBox = document.getElementById('search-box');
let coords = [];
const weatherStatus = {
    1:"Clear Sky",
    2:"Nearly clear sky",
    3:"Variable cloudiness",
    4:"Halfclear sky",
    5:"Cloudy sky",
    6:"Overcast",
    7:"Fog",
    8:"Light rain showers",
    9:"Moderate rain showers",
    10:"Heavy rain showers",
    11:"Thunderstorm",
    12:"Light sleet showers",
    13:"Moderate sleet showers",
    14:"Heavy sleet showers",
    15:"Light snow showers",
    16:"Moderate snow showers",
    17:"Heavy snow showers",
    18:"Light rain",
    19:"Moderate rain",
    20:"Heavy rain",
    21:"Thunder",
    22:"Light sleet",
    23:"Moderate sleet",
    24:"Heavy sleet",
    25:"Light snowfall",
    26:"Moderate snowfall",
    27:"Heavy snowfall",

}

//Add an event listener to button
/**btn.addEventListener('click', function(){ 
    if(document.getElementById('search-box').value != ""){
        startAPI();
        }else{
            return;
        }
    });**/
    // Add eventlisterner for enter press
searchBox.addEventListener('keyup', function(){ 
    event.preventDefault();
    if(event.keyCode == 13){
        if(document.getElementById('search-box').value != ""){
            startAPI();
            }else{
                return;
            }
        }
    });


function startAPI(){
    let bool = false
    //get user input
    let inputAdress = document.getElementById('search-box').value;


    //Creat url to LocationIQ
    urlToLocationIQ = urlLocationIQ+inputAdress+'&format=json';
    console.log(urlToLocationIQ)
    fetch(urlToLocationIQ).then(resp => resp.json())
        .then(data => {
            console.log(data)

            coords[0] = data[0].lat.slice(0,9);
            coords[1] = data[0].lon.slice(0,9);
            //Collect the correct name of adress/place to display for user
            if(data[0].type == "city"){
                let cityName = data[0].display_name.split(",");
                coords[2] = cityName[0]+", "+cityName[cityName.length-1]
            }else if(data[0].class == "place" && (data[0].type != "house" || data[0].type == "residential")){
                let cityName = data[0].display_name.split(",");
                coords[2] = cityName[0] + ", " + cityName[1] + ", " + cityName[cityName.length-1]
               
            }else if(data[0].type == "house" || data[0].type == "residential"){
                let cityName = data[0].display_name.split(",");
                if(parseInt(cityName[0]) >=0 ){
                    coords[2] = cityName[1] + " " + cityName[0]+", "+cityName[3]+", "+cityName[cityName.length-1];
                }else{
                    coords[2] = cityName[0]+", "+cityName[2]+", "+cityName[cityName.length-1];
                }
            }else if(data[0].class == "building"){
                let cityName = data[0].display_name.split(",");
                if(parseInt(cityName[0]) >=0 ){
                    coords[2] = cityName[1] + " " + cityName[0]+", "+cityName[4]+", "+cityName[cityName.length-1];
                }else{
                    coords[2] = cityName[0]+", "+cityName[2]+", "+cityName[cityName.length-1];
                }
            }else{
                coords[2] = data[0].display_name;
            }
           

            // construct correct API url to SMHI
            urlSMHI = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'+coords[1]+'/lat/'+coords[0]+'/data.json';
            // start collecting data from smhi.
            getWeatherSMHI();
            //let bol = isItSunny(coords, weatherSymbol);
            //console.log(bol)
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
            //getWeatherSymbol(data) //kallar på funktionen för att kunna kasta in weatherSymbol i updateWeather och därför printa den
            updateWeather(data)
           

        })
}

function isItSunny(coords, weatherSymbol){
    let a = parseFloat(coords[0])
    let b = parseFloat(coords[1])
    var times = SunCalc.getPosition(new Date(), a, b)
    console.log(weatherSymbol)
    console.log(times.altitude, times.azimuth)
    console.log(weatherSymbol)
    //Har skrivit om if statement
    if (times.altitude < 0){ //isåfall har solen gått ner
        return 0;
    } if (times.altitude > 0 && weatherSymbol ==  1){ //solen är uppe och det är soligt enligt SMHI OBS, verkar konstant ge true?????
        return 1;
    } if (times.altitude > 0 && weatherSymbol ==  2){
        return 2;
    }  if (times.altitude > 0 && weatherSymbol ==  3){
        return 3;
    } if (times.altitude > 0 && weatherSymbol ==  4){
        return 4;
    } else return false
}

//Här printar du!!
function updateWeather(data, weatherSymbol){
    document.getElementById('label'). innerHTML = coords[2]
    document.getElementById('temp').innerHTML = data.timeSeries[0].parameters[10].values[0]+"°C";
    weatherSymbol =parseInt(data.timeSeries[0].parameters[18].values[0]);
    console.log(weatherSymbol)
    console.log(isItSunny(coords, weatherSymbol))
    if (isItSunny(coords, weatherSymbol) == 1){
        document.getElementById('sunny').innerHTML = "100% sol, kör i vind";
    } if (isItSunny(coords, weatherSymbol) == 2){
        document.getElementById('sunny').innerHTML = "Jo men det är soligt";
    } if (isItSunny(coords, weatherSymbol) == 3){
        document.getElementById('sunny').innerHTML = "Lite sol, lite moln";
    } if (isItSunny(coords, weatherSymbol) == 4){
        document.getElementById('sunny').innerHTML = "Rätt mycket moln men solchans finns";
    } if (isItSunny(coords, weatherSymbol) == 0){
        document.getElementById('sunny').innerHTML = "...solen har gått ner";
    } if (isItSunny(coords, weatherSymbol) == false){
   document.getElementById('sunny').innerHTML = "Nej, här finns tyvärr ingen sol";
    }
}

function handelError(err){
    console.log(err)
    alert('Something went wrong, make sure to type accurate!')
}