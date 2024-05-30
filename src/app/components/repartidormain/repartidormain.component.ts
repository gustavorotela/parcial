import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RepartidordetalleComponent } from '../repartidordetalle/repartidordetalle.component';
import { PaisdetalleComponent } from '../paisdetalle/paisdetalle.component';
import { ListarepartidorComponent } from '../listarepartidor/listarepartidor.component';
import { MenuComponent } from '../menu/menu.component';

interface Repartidor {
  dni: string;
  nombre: string;
  edad: number;
  capacidadTransporte: number;
  unidadPropia: boolean;
  pais: string;
}

@Component({
  selector: 'app-repartidor-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ListarepartidorComponent, RepartidordetalleComponent, PaisdetalleComponent,MenuComponent],
  templateUrl: './repartidormain.component.html',
  styleUrls: ['./repartidormain.component.css']
})
export class RepartidormainComponent implements OnInit {
  repartidores: Repartidor[] = [];
  selectedRepartidor: Repartidor | null | undefined = null;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.fetchRepartidores();
  }

  fetchRepartidores(): void {
    const col = collection(this.firestore, 'repartidores');
    from(getDocs(col)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data() as Repartidor))
    ).subscribe({
      next: (data) => {
        this.repartidores = data;
      },
      error: (err) => console.error('Error fetching repartidores: ', err)
    });
  }

  onSelectRepartidor(repartidor: Repartidor): void {
    this.selectedRepartidor = repartidor;
  }
}