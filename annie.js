
const api = {
    key: "cccce1eca9eb8277da570d64f8ca9c6a",
    base: "http://api.positionstack.com/v1/forward",
}

const searchbox = document.querySelector('-search-box'); //checks when we hit searchbox
//searchbox.addEventListener('keypress', setQuery);
const button = document.getElementById('button');
document.addEventListener('click', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13 ){ //13 = enterbutton
        getResullts(searchbox.value); //our query
        console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(data => displayResults(data));
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`;

let now = new Date();
let date = document.querySelector('.location .date');
date.innerText = dateBuilder(now);

let temp = doocument.querySelector('.curente .temp');
temp.innerHTML = '${Math.round(weather.main.temp)<span> °c </span>}';

let weather_el = document.querySelector('.current .weather')
weather_el.innerText = weather.weather[0].main;

let hilow = document.querySelector('-hi-low');
hilow.innerTExt = '${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c';


}

function dateBulder (d) {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = month[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

