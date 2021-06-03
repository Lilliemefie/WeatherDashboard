
//create variable
var searchBtn = document.querySelector('#searchBtn');
var searchInputVal;
//API key from openweathermap (in my account)
var key = '91982993508dc4b35a5d3a4295c7bf1e';

console.log(searchBtn)

// Search bar submit function
function handleSearchFormSubmit(event){
    event.preventDefault();
    searchInputVal = document.querySelector('.searchInput').value;
    console.log(searchInputVal)
  
    if (!searchInputVal) {
      console.error('Please put the city...');
      return;
    }  
    getWeather();
  }

  
//Search button event listener
searchBtn.addEventListener('click', handleSearchFormSubmit);



// AJAX call requires a third party library, jQuery
function getWeather (){
$.ajax({
    url: ('https://api.openweathermap.org/data/2.5/weather?q=' + searchInputVal + '&units=imperial' + '&appid=' + key),
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
    console.log(response.name);
    console.log(response.main.temp);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    //set to display
    $('#curCity').text(response.name);
    $('#curTemp').text('Temperature: ' + response.main.temp);
    $('#curWind').text('Wind: ' + response.main.humidity);
    $('#curHumi').text('Humidity: ' + response.wind.speed);
  })
   .catch(function (err) {
    console.error(err);
  });
}


