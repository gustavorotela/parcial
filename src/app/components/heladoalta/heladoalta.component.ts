import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Helado {
  nombre: string;
  tipo: string;
  precio: number;
  peso: number;
}

@Component({
  selector: 'app-heladoalta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './heladoalta.component.html',
  styleUrls: ['./heladoalta.component.css']
})
export class HeladoaltaComponent {
  @Output() heladoAdded = new EventEmitter<Helado>();
  heladoForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.heladoForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]]
    });
  }

  onSubmit() {
    if (this.heladoForm.valid) {
      const helado: Helado = this.heladoForm.value;
      this.heladoAdded.emit(helado);
      this.heladoForm.reset();
    } else {
      if (this.heladoForm.get('peso')?.value < 250 || this.heladoForm.get('peso')?.value > 1000) {
        this.errorMessage = 'El peso debe estar entre 250 y 1000 gramos';
      }
    }
  }
}