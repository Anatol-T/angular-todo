import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from '../../../models/todos.models'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: Todo
  @Output() removeTodoEvent = new EventEmitter<string>()

  constructor() {}

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }
}
