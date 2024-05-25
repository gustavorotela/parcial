import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcial';

  constructor(private firestore:Firestore) {

  }

  prueba(){
    let col = collection(this.firestore,'logins');
    addDoc(col, {fecha: new Date(), "email":'hola'});
  }
}
