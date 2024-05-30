import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor() { }

  async getPaises() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
  }
}