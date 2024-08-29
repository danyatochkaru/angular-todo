import {Component, inject, Input, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TodoListService} from "../../../features/todo-list/todo-list.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent implements OnInit {
  @Input() checked = false;
  @Input() id: number = 0
  checkedControl = new FormControl()

  todoListService = inject(TodoListService)

  ngOnInit(): void {
    this.checkedControl.setValue(this.checked)

    this.checkedControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this.todoListService.updateTodoItem(this.id, {
          completed: value!
        }).subscribe()
      })
  }
}
