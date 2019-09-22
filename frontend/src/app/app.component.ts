import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cookbook';
  showMessages = environment.showMessages;
  searchString = '';
  hitEnter(event) {
    this.search();
  }
  search() {
    alert(`Searching for ${this.searchString}`);
  }
}

// move search functionality to it's own component
// same for the nav bar
// autohide search on narrow screens and have search glyph as a show