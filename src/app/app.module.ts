import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutesModule } from './app.routes';
import { AppComponent } from './app.component';
import { CatalogSectionComponent } from './components/catalog-section/catalog-section.component';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { BagSectionComponent } from './components/bag-section/bag-section.component';
import { ProductsBagComponent } from './components/products-bag/products-bag.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogSectionComponent,
    ProductsCatalogComponent,
    BagSectionComponent,
    ProductsBagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
