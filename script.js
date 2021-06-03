
//create variable

var searchInputVal;





// AJAX call requires a third party library, jQuery
$.ajax({
    url: ('https://api.openweathermap.org/data/2.5/weather?q=London&appid=91982993508dc4b35a5d3a4295c7bf1e'),
    method: 'GET',
  }).then(function (response) {
    console.log('Ajax Reponse \n-------------');
    console.log(response);
    console.log(response.name);
    console.log(response.wind.speed);
  });