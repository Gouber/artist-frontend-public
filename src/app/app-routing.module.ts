import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCertificateComponent } from './create-certificate/create-certificate.component';
import { ListCertificatesComponent } from './list-certificates/list-certificates.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'certificate-list'},
  {path: 'certificate-list', component: ListCertificatesComponent},
  {path: 'certificate-create', component: CreateCertificateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
