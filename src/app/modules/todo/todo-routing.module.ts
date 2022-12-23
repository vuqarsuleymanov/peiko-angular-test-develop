import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListComponent} from "./pages/todo-list/todo-list.component";
import {TodoDetailComponent} from "./pages/todo-detail/todo-detail.component";
import {TodoAddComponent} from "./pages/todo-add/todo-add.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: TodoListComponent
  },
  {
    path: 'detail/:id',
    component: TodoDetailComponent
  },
  {
    path: 'add',
    component: TodoAddComponent
  },
  {
    path: 'edit/:id',
    component: TodoAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
