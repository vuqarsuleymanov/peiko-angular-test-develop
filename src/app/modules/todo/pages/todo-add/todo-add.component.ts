import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ITodo} from "../../models/ITodo";
import {Router} from "@angular/router";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  todoForm!: FormGroup;
  task: ITodo | undefined;
  submitted = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private todoService: TodoService) {
    this.task = this.router.getCurrentNavigation()?.extras?.state as ITodo;
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      id: [null],
      label: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      done: [false],
    });
    this.assignData();
  }

  get f() {
    return this.todoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.invalid) {
      return;
    }

    let request;
    if (this.task) {
      request = this.todoService.editTask(this.task.id, this.todoForm.value)
    } else {
      request = this.todoService.createTask(this.todoForm.value)
    }

    request.subscribe(data => {
      this.router.navigate(['/todo/list'])
    })
  }

  assignData() {
    if (this.task) {
      this.todoForm.setValue(this.task);
    }
  }

}
