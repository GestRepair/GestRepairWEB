import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { AppComponent } from './app.component';
import { AuthComponent } from "app/auth/auth.component";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
