import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {TodoListService} from "../todo-list/todo-list.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UpperCasePipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isShown: boolean = false;
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(5)
    ]
  })

  todoListService = inject(TodoListService)

  submit() {
    this.todoListService.createTodoItem({
      completed: false,
      todo: this.title.value!,
      userId: 1,
    }).subscribe()
    this.title.reset('');
    this.isShown = false;
  }

  reset() {
    this.title.reset('');
    this.isShown = false;
  }
}
