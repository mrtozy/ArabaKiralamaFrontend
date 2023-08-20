import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  getItem(key: string) {
    return localStorage.getItem(key);
  }

  add(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }
  get(key: string): any {
    let json = localStorage.getItem(key);
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  }
}
