import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public auth: Auth, private router:Router) {
  }

  closeSession(){
    localStorage.removeItem('userLogin');
    this.router.navigateByUrl('/login');
  }

  navigateTo(url:string) {
    this.router.navigateByUrl(url);
  }
}
