import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListapaisesComponent } from '../listapaises/listapaises.component';
import { HttpClientModule } from '@angular/common/http';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { from, map } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-repartidoralta',
  standalone: true,
  imports: [CommonModule,ListapaisesComponent,ReactiveFormsModule,HttpClientModule,FormsModule,MenuComponent],
  templateUrl: './repartidoralta.component.html',
  styleUrl: './repartidoralta.component.css'
})
export class RepartidoraltaComponent {
  repartidorForm: FormGroup;
  selectedCountry: string | null = null;
  errorMessage:string = '';
  pais:string = '';

  constructor(private fb: FormBuilder, private router: Router, private firestore:Firestore) {
    this.repartidorForm = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      capacidadTransporte: ['', [Validators.required, Validators.min(1)]],
      unidadPropia: [false, Validators.required],
    });
  }

  ngOnInit(): void {}

  setCountry(country: string) {
    this.selectedCountry = country;
    this.pais = country;
  }

  async onSubmit() {
    this.errorMessage = '';
    
    if (this.repartidorForm.valid) {
      const formData = {
        ...this.repartidorForm.value,
        pais: this.selectedCountry
      };
      const dniValue = this.repartidorForm.get('dni')?.value;

      if (dniValue) {
        const col = collection(this.firestore, 'repartidores');
        const q = query(col, where('dni', '==', dniValue));
        
        from(getDocs(q)).pipe(
          map(snapshot => {
            if (snapshot.empty) {
              addDoc(col, formData);
              console.log('Repartidor added successfully');
              //this.router.navigate(['/some-route']); // Redirige a alguna ruta después de guardar
            } else {
              this.errorMessage = 'El repartidor ya existe';
            }
          })
        ).subscribe({
          error: (err) => console.error('Error checking document existence: ', err)
        });
      }
    } else {
      if(this.repartidorForm.get('edad')?.value < 18) {
        this.errorMessage = 'La edad no puede ser menor a 18';
      }
    }
  }
}
