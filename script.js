var temperature = $("#temperature")
//api will call in first search 7997643fbfaa2c17f66ac2ab91bdcea0
var wind = $("#wind-speed")
var citySearch = $("#search-city")
var search = $("#search-button")
var humid = $("#humidity")
var current = $("#current-weather")
var city ="";
var indexUV =  $("#uv-index")
var imgMain = $('.tempimg')
var cityName = $('.cityName')
var fiveDay = $('.fiveDay')

var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

async function displayWeather(city) {
    // event.preventDefault();
    // if(citySearch.val().trim()!==""){
    //     city=citySearch.val().trim();
    //     current(city);
    // }
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&appid=752927b6e41474a250396108bc4941a3&units=imperial'
    console.log(requestUrl)
    var response = await fetch(requestUrl)
    response = await response.json()
    console.log(response)
    var oneCall = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + response[0].lat + '&lon=' + response[0].lon + '&appid=752927b6e41474a250396108bc4941a3&units=imperial'
    var response2 = await fetch(oneCall)
    var weatherData = await response2.json()
    console.log(weatherData)
    cityName.text(city)
    var temp = weatherData.current.temp
    var humidity = weatherData.current.humidity
    temperature.text(temp)
    humid.text(humidity)
    var speed = weatherData.current.wind_speed
    wind.text(speed)
    var uvI = weatherData.current.uvi
    indexUV.text(uvI)
    var weatherIcon = 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png' 
    imgMain.attr('src',weatherIcon)
    

    for(var i = 0; i<5; i++){
        var div=$('<div>')
        var icon=$('<img>')
        icon.attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[i].weather[0].icon + '@2x.png')
         div.append(icon)
         var fivedayTemp =$('<p>')
         fivedayTemp.text(weatherData.daily[i].temp.day)
         var fivedayWind = $('<p>')
         fivedayWind = (weatherData.daily[i].wind_speed)
         var fivedayHu = $('<p>')
         fivedayHu.text(weatherData.daily[i].uvi)
         

         fiveDay.append(div,fivedayTemp,fivedayWind,fivedayHu)
    }
    getSearchHistory()
};


search.on('click', function() {
    var city = citySearch.val()

    cityHistory(citySearch.val());

displayWeather(city)
});

function getSearchHistory() {
    $('#searchHistory').html("")
    var history = localStorage.getItem('searchHistory')
    history = JSON.parse(history)
    console.log(history)
    console.log(typeof history)
    for(var i = 0; i<history.length; i++) {
        var location = history[i]
        
        var btn = $('<btn>')
        btn.text(location)
        btn.attr('id', location)
        btn.on('click', async function() {
            var searchTerm = this.id
            var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+searchTerm+'&appid=752927b6e41474a250396108bc4941a3&units=imperial'
    console.log(requestUrl)
    var response = await fetch(requestUrl)
    response = await response.json()
    console.log(response)
            console.log(this.id)
            
        })
        $('#searchHistory').append(btn)
    }
};

getSearchHistory()

//need to get a search history and local storage and a clear history submit 
$("#clear-history")
$("#current-city")
function cityHistory(cityName){
    //var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+citySearch.val()+'&appid=752927b6e41474a250396108bc4941a3&units=imperial'
    // var response = await fetch(requestUrl)
    // citySearch.name.window.localstorage.text
    searchHistory.push(cityName);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

}

$('#clear-history').on('click', function() {
    localStorage.clear();
});


// key(citySearch)
//use .name with fetch and or maybe use the
// 
$('#searchHistory').on('click', function(event) {
    var city = event.target.innerText
    console.log(city)
    displayWeather(city)
})




//write a function that allows user to click on those recent searches again 
//--------- and fetch the inital api as if it was a submit search
//--------- the submit search would most likely be a boolean 



