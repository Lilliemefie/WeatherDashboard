
//create variable
var searchBtn = document.querySelector('#searchBtn');
var searchInput = document.querySelector('.searchInput');
var curUV = document.querySelector('#curUV');
var fiveDayRowId = $('#fiveDayRow');
var cityListId = $('#cityListId');

//var image = document.querySelector('#curIcon')
//set variablr for the current date (nmultiple Locale Support format)
var today = moment().format('L');
//API key from openweathermap (in my account)
var key = '91982993508dc4b35a5d3a4295c7bf1e';


// Search bar submit function
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector('.searchInput').value;
  console.log(searchInputVal)

  if (!searchInputVal) {
    console.error('Please put the city...');
    return;
  } else {
    localStorage.setItem("searchInputVal", searchInputVal);
    var searchCity = localStorage.getItem("searchInputVal");
    console.log(searchCity);

    var cityList = document.createElement('li');
    cityList.setAttribute("class", "buttonList");
    $(cityList).text(searchCity);
    $('#cityListId').append(cityList);


  }
  //call function
  getWeather(searchInputVal);


}



//Search button event listener
searchBtn.addEventListener('click', handleSearchFormSubmit);



// AJAX call requires a third party library, jQuery
function getWeather(searchInputVal) {
  $.ajax({
    url: ('https://api.openweathermap.org/data/2.5/weather?q=' + searchInputVal + '&units=imperial' + '&appid=' + key),
    method: 'GET',
  }).then(function (response) {
    
    //give variable to "lat" and "lon" to use for getting UV Index API 
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    

  // To display the icon (image)
  var curIconImg = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
  document.getElementById('curIcon').src = curIconImg;

    //set to display
    $('#curCity').text('Current City:  ' + response.name + ' (' + today + ')');
    $('#curTemp').text('Temperature: ' + response.main.temp + ' °F');
    $('#curWind').text('Wind: ' + response.main.humidity);
    $('#curHumi').text('Humidity: ' + response.wind.speed);


    // the lat and lon here are from lines 38 and 39
    getUV(lat, lon);
    getFive(searchInputVal);
  })
    .catch(function (err) {
      console.error(err);
    });
}



//get UVI by using lat and lon parameter from line 38,39
function getUV(lat, lon) {
  $.ajax({
    url: ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key),
    method: 'GET',
  }).then(function (response) {
    $('#curUV').text(' ' + response.current.uvi + ' ');
    if (response.current.uvi < 5){
      curUV.classList.add('uvGood');
    }else if (response.current.uvi > 5 && response.current.uvi <= 7){
      curUV.classList.add('uvModerate');
    }else{
      curUV.classList.add('uvDanger');
    }
    
  })
    .catch(function (err) {
      console.error(err);
    });
}

//get Five Day Forecast 
function getFive(searchInputVal) {
  $.ajax({
    url: ('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&units=imperial' + '&cnt=5' + '&appid=' + key),
    method: 'GET',
  }).then(function (response) {
    console.log(response);
    fiveDayRowId.html('');
    for (var i = 0; i < response.list.length; i++) {
      
      var days = response.list[i].dt;
      console.log(days);
      var dayString = moment.unix(days).format("MM/DD/YYYY");
      console.log(dayString);

    

 //var weatherIcon 
      var weathIconDisplay = "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
      
//set to display
      fiveDayRowId.append(`<div class="col mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" id="dateFive"></h5>
          <img src= ${weathIconDisplay}>
          <p class="card-text temp">Temp: ${response.list[i].main.temp}  °F</p>
          <p class="card-text wind">Wind: ${response.list[i].wind.speed}</p>
          <p class="card-text humi">Humidity:${response.list[i].main.humidity}</p>
        </div>
      </div>
    </div>`)

    }
  })
    .catch(function (err) {
      console.error(err);
    });
}




