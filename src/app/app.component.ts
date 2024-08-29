import {Component} from '@angular/core';
import {TodoListComponent} from "./features/todo-list/todo-list.component";
import {ModalComponent} from "./features/modal/modal.component";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TodoListComponent,
    ModalComponent,
    UpperCasePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Список задач';
}
