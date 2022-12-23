import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ITodo} from "../models/ITodo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getTaskList(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(environment.apiUrl + `tasks`);
  }

  getTaskDetails(id: number): Observable<ITodo> {
    return this.httpClient.get<ITodo>(environment.apiUrl + `tasks/${id}`);
  }

  deleteTask(id: number) {
    return this.httpClient.delete(environment.apiUrl + `tasks/${id}`);
  }

  createTask(body: ITodo) {
    return this.httpClient.post(environment.apiUrl + `tasks`, body);
  }

  editTask(id: number, body: ITodo) {
    return this.httpClient.patch(environment.apiUrl + `tasks/${id}`, body);
  }

}
