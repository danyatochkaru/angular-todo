import {Component, inject, OnInit} from '@angular/core';
import {TodoListService} from "./todo-list.service";
import {ListItemComponent} from "../../shared/components/list-item/list-item.component";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    ListItemComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todoListService = inject(TodoListService)

  ngOnInit(): void {
    this.todoListService.getTodoList().subscribe()
  }
}
