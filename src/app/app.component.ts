import { Component, OnInit } from '@angular/core';
import { BagService } from './services/bag/bag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    protected bagService: BagService
  ) {}

  ngOnInit() {
  }
}
