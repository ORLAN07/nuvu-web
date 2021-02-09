import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './modules/client/components/client/client.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './modules/login/components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'client', component: ClientComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
