import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Firestore, collection, query, where, getDocs, deleteDoc } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

interface Helado {
  nombre: string;
  tipo: string;
  precio: number;
  peso: number;
}

@Component({
  selector: 'app-heladoborrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heladoborrar.component.html',
  styleUrls: ['./heladoborrar.component.css']
})
export class HeladoborrarComponent {
  @Input() helado: Helado | null = null;
  @Output() heladoDeleted = new EventEmitter<void>();

  constructor(private firestore: Firestore) {}

  deleteHelado() {
    if (this.helado) {
      const col = collection(this.firestore, 'helados');
      const q = query(col, where('nombre', '==', this.helado.nombre));

      from(getDocs(q)).pipe(
        map(snapshot => {
          if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            return from(deleteDoc(docRef));
          } else {
            throw new Error('Helado no encontrado');
          }
        })
      ).subscribe({
        next: () => {
          console.log('Helado borrado exitosamente');
          this.heladoDeleted.emit(); // Emit an event after deletion
        },
        error: (err) => console.error('Error borrando helado: ', err)
      });
    }
  }
}