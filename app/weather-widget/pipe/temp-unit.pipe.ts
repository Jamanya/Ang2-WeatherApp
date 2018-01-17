import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform {
    transform(temp: number, unitType: string) {
        switch(unitType) {
            case "fahrenheit": 
                return 
        }
    }
}