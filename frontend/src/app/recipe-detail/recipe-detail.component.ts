import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  deleteRecipe() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.recipeService.deleteRecipe(id)
      .subscribe(() => window.location.href = '/dashboard');
  }
}
