import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './modules/client/components/client/client.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: 'client', component: ClientComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
