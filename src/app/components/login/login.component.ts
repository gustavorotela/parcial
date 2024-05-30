import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { BehaviorSubject, Observable, from, map, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  emailLogeado: string = "";
  errorMessage: string = '';
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$: Observable<any> = this.userDataSubject.asObservable();
  userType: string | null = null;

  constructor(private firestore: Firestore, public Auth: Auth, private router: Router) {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userTipo');
  }

  ngOnInit(): void {
    this.userData$.subscribe(data => {
      if (data) {
        this.userType = data.tipo;
        localStorage.setItem('userLogin', this.email);
        localStorage.setItem('userTipo', this.userType ? this.userType : '');

        this.router.navigateByUrl('/bienvenido');
      }
    });
  }

  LoginRapido() {
    this.email = 'prueba@prueba.com';
    this.password = 'prueba';

    if (this.userType == 'admin') {
      this.email = 'gusrot2@gmail.com';
      this.password = 'prueba';
    } else {
      this.email = 'prueba@prueba.com';
      this.password = 'prueba';
    }

    signInWithEmailAndPassword(this.Auth, this.email, this.password).then((res) => {
      if (res.user.email != null) {
        const colRef = collection(this.firestore, 'usuarios');
        const q = query(colRef, where('email', "==", this.email));

        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            this.userDataSubject.next(userData);
          });
        }).catch((e) => this.errorMessage = 'Error al recuperar datos del usuario.');
      }
    }).catch((e) => this.errorMessage = 'El usuario y/o la contraseña son incorrectas.');
  }

  Login() {
    console.log(this.email);
    signInWithEmailAndPassword(this.Auth, String(this.email), String(this.password)).then((res) => {
      if (res.user.email != null) {
        localStorage.setItem('userLogin', res.user.email);

        const colRef = collection(this.firestore, 'usuarios');
        const q = query(colRef, where('email', "==", this.email));

        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            this.userDataSubject.next(userData);
          });
        }).catch((e) => this.errorMessage = 'Error al recuperar datos del usuario.');
      }
    }).catch((e) => this.errorMessage = 'El usuario y/o la contraseña son incorrectas.');
  }
}