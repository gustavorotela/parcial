import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { from } from 'rxjs';

interface Helado {
  nombre: string;
  tipo: string;
  precio: number;
  peso: number;
}

@Component({
  selector: 'app-heladoeditar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './heladoeditar.component.html',
  styleUrls: ['./heladoeditar.component.css']
})
export class HeladoeditarComponent implements OnInit {
  @Input() helado: Helado | null = null;
  @Output() heladoUpdated = new EventEmitter<Helado>();
  @Output() cancelEdit = new EventEmitter<void>();
  heladoForm: FormGroup;
  errorMessage:string = '';

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.heladoForm = this.fb.group({
      nombre: [{ value: '', disabled: true }, Validators.required],
      tipo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]]
    });
  }

  ngOnInit(): void {
    if (this.helado) {
      this.heladoForm.patchValue(this.helado);
    }
  }

  onSubmit() {
    if (this.heladoForm.valid && this.helado) {
      const updatedData = this.heladoForm.getRawValue();
      const col = collection(this.firestore, 'helados');
      const q = query(col, where('nombre', '==', this.helado.nombre));

      from(getDocs(q)).subscribe({
        next: snapshot => {
          if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            from(updateDoc(docRef, updatedData)).subscribe({
              next: () => {
                console.log('Helado actualizado exitosamente');
                this.heladoUpdated.emit(updatedData);
              },
              error: (err) => console.error(err)
            });
          } else {
            console.error('Helado no encontrado');
          }
        },
        error: (err) => console.error(err)
      });
    } else {
      if (this.heladoForm.get('peso')?.value < 250 || this.heladoForm.get('peso')?.value > 1000) {
        this.errorMessage = 'El peso debe estar entre 250 y 1000 gramos';
      }
    }
  }

  onCancel() {
    this.cancelEdit.emit();
  }
}