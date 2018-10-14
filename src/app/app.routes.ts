import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomePageComponent } from './pages/home/home';
import { AppComponent } from './app.component';
import { CatalogSectionComponent } from './components/catalog-section/catalog-section.component';
import { BagSectionComponent } from './components/bag-section/bag-section.component';


const appRoutes: Routes = [
  { path: 'products', component: CatalogSectionComponent },
  { path: 'bag', component: BagSectionComponent }
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
