import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  recipes: Recipe[] = [];
  saved: Recipe[];

  @Input() searchTerm: string;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getrecipes();
  }

  getrecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
        this.saved = recipes;
      });
  }

  resetRecipes(): void {
    this.recipes = this.saved;
  }

  filterRecipes(): void {
    this.resetRecipes();
    this.recipes.filter(item => {
      return item.name.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
    });
  }
}
