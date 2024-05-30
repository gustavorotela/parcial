import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
}

@Component({
  selector: 'app-paisdetalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paisdetalle.component.html',
  styleUrls: ['./paisdetalle.component.css']
})
export class PaisdetalleComponent implements OnInit, OnChanges {
  @Input() pais: string | null | undefined = null;
  country: Country | null = null;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPaises();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pais'] && changes['pais'].currentValue) {
      this.cargarPaises();
    }
  }

  cargarPaises(): void {
    if (this.pais) {
      this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${this.pais}`)
        .subscribe(data => {
          this.country = data[0];
        }, error => {
          console.error('Error loading country data:', error);
          this.country = null;
        });
    }
  }
}