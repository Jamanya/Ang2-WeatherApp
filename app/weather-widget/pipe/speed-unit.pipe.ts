import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {
    transform(speed: number, unitType: string) {
        switch(unitType) {
            case "mph":
                const miles = speed * 1.6;
                return miles + "mph";
            case "knots":
                const knots = speed * 0.868976242;
                return knots + "knots";
            default: 
                return speed + "kph";
        }
    }
 }