let today = document.getElementById("today");
let todayDate = document.getElementById("today-date");
let Currentlocation = document.getElementById("city");
let todayDegree = document.getElementById("degree");
let todayIcon = document.getElementById("today-icon");
let todayCondition = document.getElementById("today-condition");
let rain = document.getElementById("rain");
let wind = document.getElementById("wind");
let direction = document.getElementById("direction");
let DayNumber = document.getElementById("dayNumber");
let month = document.getElementById("month");

let CitySearch = document.getElementById("citySearch")

let nextDay = document.getElementsByClassName("day");
let nextIcon = document.getElementsByClassName("icon");
let nextDegree = document.getElementsByClassName("degree");
let nextMin = document.getElementsByClassName("min");
let nextCondition = document.getElementsByClassName("custom");



async function getApiData(cityName){
    let apiData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6a2aefdc8a60416ea44172750231908&q=${cityName}&days=3`)
    let weatherData = await apiData.json();
    return weatherData
}


function showTodayData(wData){

    Currentlocation.innerHTML = wData.location.name
    todayDegree.innerHTML = wData.current.temp_c
    todayIcon.setAttribute("src",wData.current.condition.icon)
    todayCondition.innerHTML= wData.current.condition.text
    rain.innerHTML = wData.current.humidity+"%"
    wind.innerHTML = wData.current.wind_kph+"km/h"
    direction.innerHTML = wData.current.wind_dir
    let toDate =  new Date()
    today.innerHTML = toDate.toLocaleDateString("en-US",{weekday:"long"})
    DayNumber.innerHTML = toDate.getDate()
    month.innerHTML = toDate.toLocaleDateString("en-US",{month:"long"})

}

function showNextData(wData){
    let nextData = wData.forecast.forecastday
    for(let i =0 ; i<2 ; i++)
    {
        nextDegree[i].innerHTML =  nextData[i+1].day.maxtemp_c
        nextMin[i].innerHTML = nextData[i+1].day.mintemp_c
        nextCondition[i].innerHTML = nextData[i+1].day.condition.text
        nextIcon[i].setAttribute("src", nextData[i+1].day.condition.icon)
        let nextDate = new Date(nextData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
    }
}

async function callData(city="istanbul"){
    let data = await getApiData(city);
    if(!data.error){
    showTodayData(data);
    showNextData(data);
    }
}
callData()

CitySearch.addEventListener("input", function(){
    callData(CitySearch.value)
})