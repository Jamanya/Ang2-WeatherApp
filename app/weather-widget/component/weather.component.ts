import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Weather } from '../model/weather';
import { WEATHER_COLORS } from '../constants/constants';

//this is just to stop the IDE from bitching about the Skycons not having a 
// typescript def.  it will compile to js at runtime 
declare var Skycons: any;

@Component ({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css'],
    providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit {
    pos: Position;
    weatherData = new Weather(null, null, null, null, null);
    currentSpeedUnit = "mph";
    currentTempUnit = "fahrenheit";
    currentLocation = "";
    icons = new Skycons();

    constructor(private service: WeatherService) { }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
        .subscribe(position => {
            this.pos = position
            this.getCurrentWeather()
            this.getLocationName();
        },
        err => console.error(err));
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
                    .subscribe(weather => {
                        this.weatherData.temp = weather["currently"]["temperature"],
                        this.weatherData.summary = weather["currently"]["summary"],
                        this.weatherData.wind = weather["currently"]["windSpeed"],
                        this.weatherData.humidity = weather["currently"]["humidity"],
                        this.weatherData.icon = weather["currently"]["icon"]
                        console.log("Weather: ", this.weatherData); //todo: REMOVE
                        this.setWeatherIcon();
                    },
                    err => console.error(err));
    }

    getLocationName() { 
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log(location); //TODO: REMOVE
                this.currentLocation = location["results"][2]["formatted_address"];
                console.log("Name: ", this.currentLocation);
            });
    }

    toggleUnits() {
        this.toggleTempUnits();
        this.toggleSpeedUnits();    
    }

    toggleTempUnits() {
        (this.currentTempUnit == "fahrenheit") ?
            this.currentTempUnit = "celsius" :
            this.currentTempUnit = "fahrenheit";
    }

    toggleSpeedUnits() {
        (this.currentSpeedUnit == "kph") ? 
        this.currentSpeedUnit = "mph" : 
        this.currentSpeedUnit = "kph";
    }

    setWeatherIcon() {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    setWeatherStyles(): Object {
        if(this.weatherData.icon) {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            this.icons.color = WEATHER_COLORS["default"]["color"];
            return WEATHER_COLORS["default"];
        }
    }
 } 