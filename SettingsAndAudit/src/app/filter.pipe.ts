import { Pipe, PipeTransform } from '@angular/core';
import { Audit } from './Interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Audit[], searchDateTime: any, searchHost: any, searchEvent: any, searchDescription: any): any {
    return value.filter(function(value){
      return (searchDateTime == null? true : new String(value.dateTime).includes(searchDateTime)) &&
             (searchHost == null? true : value.host.includes(searchHost)) &&
             (searchEvent == null? true : value.event.includes(searchEvent)) &&
             (searchDescription == null? true : value.description.includes(searchDescription));
   })
 }

}
