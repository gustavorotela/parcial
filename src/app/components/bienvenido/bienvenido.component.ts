import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
}

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MenuComponent],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {
  user: GitHubUser | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<GitHubUser>('https://api.github.com/users/gustavorotela')
      .subscribe(data => this.user = data);
  }
}
