import { Component, OnInit } from '@angular/core';
import { BagService } from './services/bag/bag.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  isIndexPage = false;

  constructor(
    private router: Router,
    protected bagService: BagService
  ) {}

  ngOnInit() {
    this.router.events
      .subscribe((e) => {
        if (e instanceof NavigationEnd) {
          this.isIndexPage = e.url === '/';
          window.scrollTo(0, 0);
        }
    });
  }
}
