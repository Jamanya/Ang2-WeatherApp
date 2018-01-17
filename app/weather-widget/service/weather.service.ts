import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { FORCAST_KEY, FORCAST_ROOT } from '../constants/constants';

@Injectable()
export class WeatherService {

    constructor(private jsonp: Jsonp) {

    }


    getCurrentLocation(): [number, number] {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log("Position: ", pos.coords.latitude, ",", pos.coords.longitude);
                return [pos.coords.latitude, pos.coords.longitude];
            }, 
             err => console.error("Unable to get the position - ", err));
        } else {
            console.error("GeoLocation is not available");
            return [0,0];
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORCAST_ROOT + FORCAST_KEY + "/" + lat + "," + long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
                .map(data => data.json())
               .catch(err => {
                console.error("unable to get weather data - ", err);
                return Observable.throw(err.json())
        });
    }  
}
