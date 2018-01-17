import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather-widget/component/weather.component';

import { SpeedUnitPipe } from './weather-widget/pipe/speed-unit.pipe';

@NgModule({
    imports: [ BrowserModule, JsonpModule ],
    declarations: [ AppComponent, WeatherComponent, SpeedUnitPipe ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }