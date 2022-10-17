import { AfterContentInit, Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { Todo } from '../../models/todos.models'
import { AuthService } from '../../../core/services/auth.service'
import { LoadingService } from '../../../core/services/loading.service'

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos$: Observable<Todo[]>
  todoTitle = ''
  loading$: Observable<boolean>

  constructor(
    private todosService: TodosService,
    private authService: AuthService,
    private loader: LoadingService
  ) {
    this.todos$ = this.todosService.todos$
    this.loading$ = this.loader.loading$
  }

  ngOnInit(): void {
    this.todosService.getTodos()
  }
  addTodoHandler() {
    this.todosService.addTodo(this.todoTitle)
    this.todoTitle = ''
  }

  removeTodo(todoId: string) {
    this.todosService.removeTodo(todoId)
  }

  editTodo(data: { todoId: string; title: string }) {
    this.todosService.updateTodoTitle(data)
  }

  logoutHandler() {
    this.authService.logout()
  }
}
