let pos = null;
var d = new Date();
			document.getElementById("day").innerHTML = d.getDate();
			
			var month = new Array();
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";
			document.getElementById("month").innerHTML = month[d.getMonth()];



            
let icons = {

    'Clear': "wi wi-day-sunny",
    'Clouds': "wi wi-day-cloudy",
    'Rain': "wi wi-day-rain"
}


setInterval(() => {

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
  } 
  
  
  function showPosition(position) {
    pos = position;
  }
  function showError() {
    console.log("not able to receive position.")
  } 

  

  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude +'&lon=' + pos.coords.longitude +'&appid=d01a6133bde20095d4e4eeb33b6fc10e')
  .then(data => data.json())
  .then(response => {

      $('.city').text(response.name + ", " + response.sys.country);
      $('.temperature').text(Math.round((response.main.temp - 273.15)) +  "°C")
      $('.description').text(response.weather[0].description);

      for(const [key, value] of Object.entries(icons)) {
          if(key == response.weather[0].main) {
              $('.weatherIcon i').addClass(value);
          }
      }
  } )
}, 2000);
  
