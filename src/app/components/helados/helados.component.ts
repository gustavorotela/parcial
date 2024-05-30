import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeladoaltaComponent } from '../heladoalta/heladoalta.component';
import { HeladoeditarComponent } from '../heladoeditar/heladoeditar.component';
import { HeladoborrarComponent } from '../heladoborrar/heladoborrar.component';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';

interface Helado {
  nombre: string;
  tipo: string;
  precio: number;
  peso: number;
}

@Component({
  selector: 'app-helados',
  standalone: true,
  imports: [CommonModule, HeladoaltaComponent, HeladoeditarComponent, HeladoborrarComponent, MenuComponent],
  templateUrl: './helados.component.html',
  styleUrls: ['./helados.component.css']
})
export class HeladosComponent implements OnInit {
  helados: Helado[] = [];
  selectedHelado: Helado | null = null;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.fetchHelados();
  }

  fetchHelados(): void {
    const col = collection(this.firestore, 'helados');
    from(getDocs(col)).pipe(
      map(snapshot => snapshot.docs.map(doc => doc.data() as Helado))
    ).subscribe({
      next: (data) => {
        this.helados = data;
      },
      error: (err) => console.error('Error fetching helados: ', err)
    });
  }

  addHelado(helado: Helado): void {
    const col = collection(this.firestore, 'helados');
    from(addDoc(col, helado)).subscribe({
      next: () => {
        this.fetchHelados();  // Refresh the list after adding a new helado
      },
      error: (err) => console.error('Error adding helado: ', err)
    });
  }

  selectHelado(helado: Helado): void {
    this.selectedHelado = helado;
  }

  updateHelado(updatedHelado: Helado): void {
    this.helados = this.helados.map(h =>
      h.nombre === updatedHelado.nombre ? updatedHelado : h
    );
    this.selectedHelado = null;
  }

  cancelEdit(): void {
    this.selectedHelado = null;
  }

  onHeladoDeleted(): void {
    this.fetchHelados(); // Refresh the list after deleting a helado
  }
}