
//create variable
var searchBtn = document.querySelector('#searchBtn');
var searchInput = document.querySelector('.searchInput');
var fiveDayRowId = $('#fiveDayRow');
var cityListId = $('#cityListId');
//set variablr for the current date (nmultiple Locale Support format)
var today = moment().format('L');
//API key from openweathermap (in my account)
var key = '91982993508dc4b35a5d3a4295c7bf1e';



// Search bar submit function
function handleSearchFormSubmit(event){
    event.preventDefault();
    var searchInputVal = document.querySelector('.searchInput').value;
    console.log(searchInputVal)
  
    if (!searchInputVal) {
      console.error('Please put the city...');
      return;
    }else{
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


//save searched city on left side
// function saveCity(searchInputVal){
//   var searchCity = localStorage.getItem("searchInputVal", searchInputVal);
//   console.log(searchCity);
  //var cityList = document.textContent(searchCity);

  // var cityBtn = document.createElement('li');
  // cityBtn.appendChild(cityList);
  // cityListId.appendChild(cityBtn);


// }



// AJAX call requires a third party library, jQuery
function getWeather (searchInputVal){
$.ajax({
    url: ('https://api.openweathermap.org/data/2.5/weather?q=' + searchInputVal + '&units=imperial' + '&appid=' + key),
    method: 'GET',
  }).then(function (response) {
    console.log(response);

    //give variable to "lat" and "lon" to use for getting UV Index API 
    var lat = response.coord.lat;
    var lon = response.coord.lon;
  

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
        url: ('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&units=imperial' + '&cnt=5' + '&appid=' + key),
        method: 'GET',
      }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.list.length; i++) {
      //  $(temp).text(response.list[i].main.temp);   

      
      fiveDayRowId.append(`<div class="col mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" id="dateFive">Date</h5>
          <img src="https://img.icons8.com/fluent-systems-regular/2x/puzzle.png">
          <p class="card-text temp">Temp: ${response.list[i].main.temp}  °F</p>
          <p class="card-text wind">Wind: ${response.list[i].wind.speed}</p>
          <p class="card-text humi">Humidity:${response.list[i].main.humidity}</p>
        </div>
      </div>
    </div>`)


      //console.log(response.list[0].main.temp);

      }
      })
       .catch(function (err) {
        console.error(err);
      });
    }

 


