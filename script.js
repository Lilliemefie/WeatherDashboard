
//create variable
var searchBtn = document.querySelector('#searchBtn');
//var searchInputVal;
//API key from openweathermap (in my account)
var key = '91982993508dc4b35a5d3a4295c7bf1e';
// var lat;
// var lon;


// Search bar submit function
function handleSearchFormSubmit(event){
    event.preventDefault();
    var searchInputVal = document.querySelector('.searchInput').value;
    console.log(searchInputVal)
  

    if (!searchInputVal) {
      console.error('Please put the city...');
      return;
    }  
    getWeather(searchInputVal);
    getFive(searchInputVal);
  }

  
//Search button event listener
searchBtn.addEventListener('click', handleSearchFormSubmit);





// AJAX call requires a third party library, jQuery
function getWeather (searchInputVal){
$.ajax({
    url: ('https://api.openweathermap.org/data/2.5/weather?q=' + searchInputVal + '&units=imperial' + '&appid=' + key),
    method: 'GET',
  }).then(function (response) {
    
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    console.log(lat);
    console.log(lon);
  
  
    //set to display
    $('#curCity').text(response.name);
    $('#curTemp').text('Temperature: ' + response.main.temp + '°F');
    $('#curWind').text('Wind: ' + response.main.humidity);
    $('#curHumi').text('Humidity: ' + response.wind.speed);

    var today = moment().format('L');
    $("#curDay").text(today);
    console.log(today);

    // the lat and lon here are from lines 38 and 39
    getUV(lat, lon);
    
  })
   .catch(function (err) {
    console.error(err);
  });
}

function getUV (lat, lon){
  $.ajax({
      url: ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key),
      method: 'GET',
    }).then(function (response) {
  
      $('#curUV').text('UV Index: ' + response.current.uvi);
      
    })
     .catch(function (err) {
      console.error(err);
    });
  }
  

  function getFive(searchInputVal){
    $.ajax({
        url: ('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&cnt=5' + '&appid=' + key),
        method: 'GET',
      }).then(function (response) {
    
      console.log(response);  
        
      })
       .catch(function (err) {
        console.error(err);
      });
    }

   

// 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key),

// function getUV (){
// $.ajax({
//   uvApiUrl: ('https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + key),
//   method: 'GET',
// }).then(function (response) {
//   var lat = response.coord.lat;
//   var lon = response.coord.lon;
//   console.log(response);
//     return response.json()

//   })



