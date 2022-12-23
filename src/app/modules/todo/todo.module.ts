import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TodoDetailComponent } from './pages/todo-detail/todo-detail.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoAddComponent } from './pages/todo-add/todo-add.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoDetailComponent,
    TodoFormComponent,
    TodoAddComponent
  ],
    imports: [
        CommonModule,
        TodoRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class TodoModule { }
