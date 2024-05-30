import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  errorMessage: string | null = null;
  errorMensajeSuscripcion: Subscription | null = null;

  constructor(public auth: Auth, private router:Router,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.errorMensajeSuscripcion = this.authService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
      if (this.errorMessage) {
        setTimeout(() => {
          this.authService.clearErrorMessage();
          this.errorMessage = null;
        }, 5000);
      }
    });
  }

  closeSession(){
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userTipo');
    this.router.navigateByUrl('/login');
  }

  navigateTo(url:string) {
    this.router.navigateByUrl(url);
  }
}
