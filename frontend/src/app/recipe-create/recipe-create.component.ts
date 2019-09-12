import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { Format } from '../format';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})

export class RecipeCreateComponent extends Format implements OnInit {
  recipe: Recipe = new Recipe();

  constructor(
    private recipeService: RecipeService,
  ) {
    super();
  }

  ngOnInit() {
  }

  submit(): void {
    if (this.isValid()) {
      this.recipe = this.formatFields();
      this.recipeService.createRecipe(this.recipe)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    window.location.href = '/dashboard';
  }
}
