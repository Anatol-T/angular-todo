import { Component, EventEmitter, Output } from '@angular/core'
import { Filter } from '../../../../models/todos.models'

@Component({
  selector: 'tl-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.css'],
})
export class TodoFiltersComponent {
  @Output() changeFilterEvent = new EventEmitter<Filter>()
  filter: Filter = 'all'

  changeFilterHandler(filter: Filter) {
    this.filter = filter
    this.changeFilterEvent.emit(filter)
  }
}
