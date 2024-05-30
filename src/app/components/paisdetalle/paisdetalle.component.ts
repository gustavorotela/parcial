import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

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
  styleUrl: './paisdetalle.component.css'
})
export class PaisdetalleComponent implements OnInit {
  @Input() pais: string | null | undefined = null;
  country: Country | null = null;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.pais) {
      this.http.get<Country[]>(`https://restcountries.com/v3.1/name/${this.pais}`)
        .subscribe(data => {
          this.country = data[0];
        });
    }
  }
}
