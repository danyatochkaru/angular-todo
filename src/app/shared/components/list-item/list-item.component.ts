import {Component, inject, Input, OnInit} from '@angular/core';
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {SvgIconComponent} from "angular-svg-icon";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoListService} from "../../../features/todo-list/todo-list.service";

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    CheckboxComponent,
    NgOptimizedImage,
    SvgIconComponent,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent implements OnInit {
  @Input() id: number = 0
  @Input() title: string = ''
  @Input() checked: boolean = false
  isDeleted: boolean = false
  editMode = false
  errorMessage = ''
  titleControl: FormControl | undefined;

  todoListService = inject(TodoListService)

  ngOnInit(): void {
    this.titleControl = new FormControl(this.title, {
      nonNullable: true,
      validators: [
        Validators.minLength(1),
        Validators.required
      ]
    })
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.titleControl?.setValue(this.title)
    }
  }

  saveChanges() {
    this.errorMessage = ''
    if (!this.titleControl?.valid) {
      this.errorMessage = 'Заполните задачу'
      return
    }

    this.editMode = false;
    this.todoListService.updateTodoItem(this.id, {
      todo: this.titleControl.value
    }).subscribe()
  }

  deleteTodo() {
    this.todoListService.deleteTodoItem(this.id).subscribe()
  }
}
