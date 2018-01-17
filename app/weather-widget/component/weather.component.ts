import { Component } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component ({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: [ 'weather.component.css'],
    providers: [ WeatherService ]
})
export class WeatherComponent {
    pos: Position;

    constructor(private service: WeatherService) {
        this.service.getCurrentLocation()
        .subscribe(position => {
            this.pos = position
            this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => console.log(weather),
             err => console.error(err));
        },
        err => console.error(err));
        
    }
 } 