import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe';
import { Format } from '../format';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-update',
  templateUrl: './recipe-update.component.html',
  styleUrls: ['./recipe-update.component.css']
})

export class RecipeUpdateComponent extends Format implements OnInit {
  recipe: Recipe = new Recipe();

  @Input() nameString: string;
  @Input() instructionString: string;
  @Input() ingredientString: string;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.nameString = recipe.name;
        this.ingredientString = recipe.ingredients.join('\n');
        this.instructionString = recipe.instructions;
      });
  }

  submit(): void {
    if (this.isValid()) {
      this.recipe = this.formatFields();
      this.recipe.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.recipeService.updateRecipe(this.recipe)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
