import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomePageComponent } from './pages/home/home';
import { AppComponent } from './app.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';


const appRoutes: Routes = [
  { path: 'products', component: ProductsSectionComponent }
];


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})

export class AppRoutesModule {}
