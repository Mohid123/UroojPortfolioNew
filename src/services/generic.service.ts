import { EventEmitter, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  emitFileEvent: EventEmitter<any> = new EventEmitter();
  isLoggedIn = signal(!!localStorage.getItem('token') || false);

  constructor() {}

}
