import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {ActivatedRoute} from "@angular/router";
import {ITodo} from "../../models/ITodo";

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  errorMessage = '';
  task!: ITodo;

  constructor(private activatedRoute: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit(): void {
    const id: number = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);
    this.getTaskDetails(id);
  }

  getTaskDetails(id: number) {
    this.errorMessage = '';
    this.todoService.getTaskDetails(id).subscribe({
      next: value => {
        this.task = value;
      },
      error: err => {
        this.errorMessage = err.statusText;
      }
    })
  }

}
