import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ManyTodoResponse, SingleTodoResponse} from "../../shared/models/todo.model";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  httpClient = inject(HttpClient)
  todoList = new BehaviorSubject<SingleTodoResponse[]>([])

  getTodoList() {
    return this.httpClient.get<ManyTodoResponse>('https://dummyjson.com/todos?limit=10')
      .pipe(tap(res => this.todoList.next(res.todos)))
  }

  createTodoItem(payload: Omit<SingleTodoResponse, 'id'>) {
    return this.httpClient.post<SingleTodoResponse>('https://dummyjson.com/todos/add', payload, {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      tap(t => {
        this.todoList.next([...this.todoList.value, t])
      })
    )
  }

  updateTodoItem(id: SingleTodoResponse['id'], payload: Partial<Pick<SingleTodoResponse, 'completed' | 'todo'>>) {
    return this.httpClient.patch<SingleTodoResponse>(`https://dummyjson.com/todos/${id}`, payload, {
      headers: {'Content-Type': 'application/json'}
    })
      .pipe(tap(todo => {
        this.todoList.next(
          this.todoList.value.map(t =>
            t.id !== todo.id ? t : todo
          )
        )
      }))
  }

  deleteTodoItem(id: SingleTodoResponse['id']) {
    return this.httpClient.delete<SingleTodoResponse & {
      "isDeleted": boolean,
      "deletedOn": string
    }>(`https://dummyjson.com/todos/${id}`)
      .pipe(tap(todo => {
        this.todoList.next(this.todoList.value.filter(t =>
          t.id !== todo.id
        ))
      }))
  }
}
