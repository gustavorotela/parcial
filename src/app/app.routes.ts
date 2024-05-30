import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { RepartidoraltaComponent } from './components/repartidoralta/repartidoralta.component';
import { authGuard } from './guards/auth.guard';
import { RepartidormainComponent } from './components/repartidormain/repartidormain.component';

export const routes: Routes = [
    { path:"", component:LoginComponent },
    { path:"login", component:LoginComponent },
    { path:"bienvenido", component:BienvenidoComponent },
    { path:"altarepartidor", component:RepartidoraltaComponent,canActivate: [authGuard] },
    { path:"listarepartidor", component:RepartidormainComponent,canActivate: [authGuard] },
];
