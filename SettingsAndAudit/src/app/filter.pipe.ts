import { Pipe, PipeTransform } from '@angular/core';
import { Audit } from './Interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Audit[], searchDateTime: any, searchHost: any, searchEvent: any, searchDescription: any): any {
    //console.log(searchDateTime === undefined && searchHost === undefined && searchEvent === undefined && searchDescription === undefined)
    //if(searchDateTime === undefined && searchHost === undefined && searchEvent === undefined && searchDescription === undefined) return value
    console.log(`DateTime ${searchDateTime}`)
    console.log(`Host ${searchHost}`)
    console.log(`Event ${searchEvent}`)
    console.log(`Description ${searchDescription}`)
    return value.filter(function(value){
      console.log('--------------------------')
      console.log(searchHost === undefined? true : value.host.includes(searchHost))
      console.log(searchEvent === undefined? true : value.event.includes(searchEvent))
      console.log(searchDescription === undefined? true : value.description.includes(searchDescription))

      console.log(searchHost ==null? true : value.host.includes(searchHost) && searchEvent ==null? true : value.event.includes(searchEvent) && searchDescription ==null? true : value.description.includes(searchDescription))
     return (searchHost == null? true : value.host.includes(searchHost)) &&
            (searchEvent == null? true : value.event.includes(searchEvent)) &&
            (searchDescription == null? true : value.description.includes(searchDescription));
   })
 }

}
