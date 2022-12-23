import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITodo} from "../../models/ITodo";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() task!: ITodo;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDone: EventEmitter<{id: number, done: boolean}> = new EventEmitter<{id: number, done: boolean}>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(id: number) {
    const confirmation = confirm('Are you sure?');
    if (confirmation)
      this.onDelete.emit(id);
  }

  editTask(id: number) {
    this.onEdit.emit(id);
  }

  doneTask() {
    this.onDone.emit({id: this.task.id, done: this.task.done});
  }
}
