import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from '../../../../services/tasks.service'
import { filter, map, Observable } from 'rxjs'
import { Task } from '../../../../models/tasks.models'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  taskTitle = ''

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map(tasksObj => tasksObj[this.todoId])
    )
    this.tasksService.getTasks(this.todoId)
  }
  addTaskHandler() {
    this.tasksService.addTask({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }

  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksService.removeTask(data)
  }
}
