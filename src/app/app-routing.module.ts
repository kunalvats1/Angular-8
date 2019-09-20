import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { SubadminLoginComponent } from './admin-login/subadmin-login.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'subadmin', loadChildren: './subAdmin/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'login', component: LoginComponent },
  { path: 'subadmin-login', component: SubadminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
