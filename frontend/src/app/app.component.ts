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
  search: string;
  hitEnter(event) {
    alert(`Searching for ${this.search}`);
  }
}
