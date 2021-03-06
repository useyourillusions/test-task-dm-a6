import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Product from '../../interfaces/product.interface';

@Component({
  selector: 'app-catalog-section',
  templateUrl: './catalog-section.component.html'
})
export class CatalogSectionComponent implements OnInit {

  currentPage;
  pagesQty;
  productsQty;
  pagesList = [];
  productsPerPage = 6;
  productsForCurrentPage;
  allProducts: Product[];

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.queryParams
      .subscribe((params: Params) => {
        this.currentPage = Math.abs(params['page']) || null;

        if (this.currentPage && Number(this.currentPage)) {
          this.paginate();
        } else {
          this.router.navigate(['/products'], {queryParams: {page: 1}});
        }
    });
  }

  ngOnInit() {
    this.http.get('https://api.myjson.com/bins/1g2o7w')
      .subscribe(
        this.processResponse.bind(this),
        err => console.log(err)
      );
  }

  processResponse(res): void {
    if (res && res['results']) {
      this.productsQty = res['results'].length;
      this.allProducts = res['results'];
      this.paginate();
    }
  }

  paginate(): void {
    if (!this.allProducts) {
      return;
    }

    this.pagesList = [];
    this.pagesQty = Math.ceil(this.productsQty / this.productsPerPage);

    if (this.currentPage > this.pagesQty) {
      this.router.navigate(['/products'], {queryParams: {page: this.pagesQty}});
    } else {
      const counter = Math.floor((this.currentPage - 1) / 4);

      for (let i = 0; i < 4; i++) {
        this.pagesList.push(counter * 4 + i + 1);
      }

      this.productsForCurrentPage = this.allProducts
        .slice((this.currentPage - 1) * this.productsPerPage, this.currentPage * this.productsPerPage);
    }
  }

  changePage(event: Event, page): void {
    event.preventDefault();
    if (page) {
      this.router.navigate(['/products'], {queryParams: {page: page}});
    }
  }
}
