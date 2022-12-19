import {AbstractControl,ValidationErrors, ValidatorFn } from "@angular/forms"
import { DatePipe } from '@angular/common';
export class DateValidator{
    static between(firstDate:string,lastDate:string): ValidatorFn{
    return (control : AbstractControl) :{[key: string]: any} | null=>{
        var inputDate : number;
        var first :number;
        var last : number;
        var datePipe = new DatePipe('en_US');
        if (control.value !== undefined && isNaN(control.value)){
            first = Date.parse(firstDate);
            last = Date.parse(lastDate);
            inputDate = Date.parse(control.value);
            if ( inputDate >= first && inputDate <= last )
                return null;
            else
                return { 'between' : true , 'requiredValue' : `${datePipe.transform(firstDate,'dd/MM/yyy')} and ${datePipe.transform(lastDate,'dd/MM/yyyy')}`};
        }
        return { 'between' : true , 'requiredValue' : `${datePipe.transform(firstDate,'dd/MM/yyy')} and ${datePipe.transform(lastDate,'dd/MM/yyyy')}`} ;
    };
    }
}
