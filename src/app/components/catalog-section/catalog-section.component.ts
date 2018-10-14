import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  productsToShow;
  allProducts;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    activatedRoute.queryParams
      .subscribe((params: Params) => {
        this.currentPage = Math.abs(params['page']) || null;

        if (this.currentPage && Number(this.currentPage)) {
          this.allProducts && this.paginate();
        } else {
          this.router.navigate(['/products'], {queryParams: {page: 1}});
        }
    });
  }

  ngOnInit() {
    this.http.get('https://api.myjson.com/bins/1g2o7w')
      .subscribe(
        res => {
          if (res && res['results']) {
            this.productsQty = res['results'].length;
            this.allProducts = res['results'];
            this.paginate();
          }
        },
        err => console.log(err)
      );
  }

  paginate(): void {
    this.pagesList = [];
    this.pagesQty = Math.ceil(this.productsQty / this.productsPerPage);

    if (this.currentPage > this.pagesQty) {
      this.router.navigate(['/products'], {queryParams: {page: this.pagesQty}});
    } else {
      const counter = Math.floor((this.currentPage - 1) / 4);
      for (let i = 0; i < 4; i++) {
        this.pagesList.push(counter * 4 + i + 1);
      }

      this.productsToShow = this.allProducts.slice((this.currentPage - 1) * 6, this.currentPage * 6);
    }
  }

  changePage(event: Event, page) {
    event.preventDefault();
    if (page) {
      this.router.navigate(['/products'], {queryParams: {page: page}});
    }
  }
}
