import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeBaseUrl = environment.url;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getRecipes(): Observable<Recipe[]> {
    this.log('HeroService: fetched heroes');
    return this.http.get<Recipe[]>(this.recipeBaseUrl)
  }

  getRecipe(id: number): Observable<Recipe> {
    this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Recipe>(`${this.recipeBaseUrl}/${id}`)
  }

  createRecipe(recipe: Recipe): Observable<void> {
    return this.http.post<void>(this.recipeBaseUrl, recipe);
  }

  updateRecipe(recipe: Recipe): Observable<void> {
    const updateUrl = `${this.recipeBaseUrl}/${recipe.id}`
    return this.http.put<void>(updateUrl, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.recipeBaseUrl}/${id}`);
  }

  private log(message: string) {
    this.messageService.add(`recipe service: ${message}`)
  }
}
