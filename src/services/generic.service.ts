import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  emitFileEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
