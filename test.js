var btn = document.getElementById('btn_temp');
var temp = document.querySelector('.temp');

//const url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/17.643673/lat/59.864363/data.json'

// var url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${long}/lat/${lat}/data.json'

btn.addEventListener('click', function(){ getWeather()});

// long 17.643673
// lat 59.864363
function getWeather(){
    var long = document.getElementById('long').value;
    var lat = document.getElementById('lat').value;
    console.log(long, lat)
    var url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'+long+'/lat/'+lat+'/data.json'
    fetch(url).then(resp => resp.json()).then(data => {
        console.log(data);
        updateTemp(data);
    }).catch(err => {alert('Någonting gick fel, kom ihåg att det behöver vara en plats i sverige, nedan är felmeddelande \n'+err)})
}

function updateTemp(data){
    console.log(data)
    tempValue = data.timeSeries[0].parameters[10].values[0];
    console.log(tempValue);
    document.getElementById('temp').innerHTML = tempValue+'°C';
}