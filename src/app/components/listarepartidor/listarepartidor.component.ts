import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

interface Repartidor {
  dni: string;
  nombre: string;
  edad: number;
  capacidadTransporte: number;
  unidadPropia: boolean;
  pais: string;
}

@Component({
  selector: 'app-listarepartidor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listarepartidor.component.html',
  styleUrls: ['./listarepartidor.component.css']
})
export class ListarepartidorComponent implements OnInit {
  @Output() repartidorSelected = new EventEmitter<Repartidor>();
  repartidores: Repartidor[] = [];

  constructor(private router: Router, private firestore: Firestore) {}

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

  selectRepartidor(repartidor: Repartidor): void {
    this.repartidorSelected.emit(repartidor);
  }
}