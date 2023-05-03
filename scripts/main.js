let key = "1efbb47593e31c8a637835bc32764ffe";
let result = document.getElementById("result");
let resResult = document.getElementById("res-result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let cat_url = "https://meowfacts.herokuapp.com/";

let catFact = () => {
  fetch(cat_url)
    .then((resp) => resp.json())
    .then((d) => {
      console.log(d)
      result.style.display = "block";
      result.innerHTML = `<h2>Random Cat Fact</h2>
      <p>${d.data[0]}</p>`;
    });
}

let getWeather = () => {
  let cityValue = cityRef.value;
  if (cityValue.length == 0) {
    catFact()
  }
  else {
    result.COMMENT_NODE
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=imperial`;
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">Today's weather is ${data.weather[0].main} and it is specifically ${data.weather[0].description}</h4>
        <h4>The current temperature is ${Math.round(data.main.temp)} &#176;F</h4>
        <h4>The minimum temperature is ${Math.round(data.main.temp_min)} &#176;F</h4> 
        <h4>The maximum temperature is ${Math.round(data.main.temp_max)} &#176;F</h4>
        `;
      })
      .catch(() => {
        catFact()
      });
  }
};

searchBtn.addEventListener("click", getWeather);
cityRef.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    getWeather()
  }
});
window.addEventListener("load", getWeather);