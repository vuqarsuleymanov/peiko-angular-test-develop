import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {ITodo} from "../../models/ITodo";
import {debounceTime, filter, fromEvent, map, distinctUntilChanged} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  taskList: ITodo[] = [];
  filteredTaskList: ITodo[] = [];
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;

  constructor(private router: Router, private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.getTaskList();
    this.listenSearchInput();
  }

  getTaskList() {
    this.todoService.getTaskList().subscribe(data => {
      this.taskList = this.filteredTaskList = data;
    });
  }

  listenSearchInput() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        if (event.target.value.trim() === '') {
          this.filteredTaskList = this.taskList;
        }
        return event.target.value;
      })
      , debounceTime(500)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.filteredTaskList = this.taskList.filter(task => task.label.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        task.description.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        task.category.toLowerCase().indexOf(text.toLowerCase()) > -1)
    });
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(data => {
      this.getTaskList();
    });
  }

  editTask(id: number) {
    this.router.navigate(['/todo/edit/', id], {
      state: this.taskList.find(task => task.id === id)
    });
  }

  doneTask(done: { id: number, done: boolean }) {
    const task = this.taskList.find(task => task.id === done.id);
    this.todoService.editTask(done.id, task!).subscribe(data => {
      this.getTaskList();
    });
  }
}
