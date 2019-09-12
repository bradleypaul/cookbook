import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update/recipe-update.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: RecipeDetailComponent },
  { path: 'update/:id', component: RecipeUpdateComponent },
  { path: 'new', component: RecipeCreateComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard' }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
