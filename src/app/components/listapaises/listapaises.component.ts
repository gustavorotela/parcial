import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { map } from 'rxjs';
import { PaisesService } from '../../services/paises.service';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  region: string;
}

@Component({
  selector: 'app-listapaises',
  standalone: true,
  imports: [CommonModule,MenuComponent,HttpClientModule],
  templateUrl: './listapaises.component.html',
  styleUrl: './listapaises.component.css'
})
export class ListapaisesComponent implements OnInit {
  @Output() countrySelected = new EventEmitter<string>();
  countries: Country[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPaises();
  }

  async cargarPaises() {
    this.http.get<Country[]>('https://restcountries.com/v3.1/all')
    .subscribe(data => {
      this.countries = data.filter(country => 
        country.region === 'Africa' || country.region === 'Europe'
      ).slice(0, 6);  // Selecciona los primeros 3 países
      
    });
  }

  selectCountry(country: Country) {
    this.countrySelected.emit(country.name.common);
  }
}
