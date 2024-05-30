import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

interface Repartidor {
  dni: string;
  nombre: string;
  edad: number;
  capacidadTransporte: number;
  unidadPropia: boolean;
  pais: string;
}

@Component({
  selector: 'app-repartidor-detalle',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './repartidordetalle.component.html',
  styleUrls: ['./repartidordetalle.component.css']
})
export class RepartidordetalleComponent implements OnInit {
  @Input() repartidor: Repartidor | null = null;

  ngOnInit(): void {}
}