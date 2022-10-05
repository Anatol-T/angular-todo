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
  @Output() editTodoEvent = new EventEmitter<{
    todoId: string
    title: string
  }>()

  isEditMode = false
  newTitle = ''

  constructor() {}

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }

  toggleEditMode() {
    if (this.isEditMode) {
      this.editTodoEvent.emit({ todoId: this.todo.id, title: this.newTitle })
    } else {
      this.newTitle = this.todo.title
    }
    this.isEditMode = !this.isEditMode
  }
}
