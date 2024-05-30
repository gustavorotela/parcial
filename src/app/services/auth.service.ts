import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  setErrorMessage(message: string | null) {
    this.errorMessageSubject.next(message);
  }

  clearErrorMessage() {
    this.errorMessageSubject.next(null);
  }
}