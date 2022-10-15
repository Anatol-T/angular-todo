import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { TasksService } from '../../../../services/tasks.service'
import { map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../../models/tasks.models'
import { TaskStatusEnum } from '../../../../../core/enums/taskStatus.enum'
import { Filter } from '../../../../models/todos.models'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() todoId!: string
  @Input() filter!: Filter

  tasks$?: Observable<Task[]>

  taskTitle = ''
  taskStatusEnum = TaskStatusEnum

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    // this.tasks$ = this.tasksService.tasks$.pipe(
    //   map(tasksObj => tasksObj[this.todoId])
    // )
    this.tasksService.getTasks(this.todoId)
  }
  addTaskHandler() {
    this.tasksService.addTask({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'].currentValue !== changes['filter'].previousValue) {
      switch (this.filter) {
        case 'active': {
          this.tasks$ = this.tasksService.tasks$.pipe(
            map(tasksObj =>
              tasksObj[this.todoId].filter(
                el => el.status === this.taskStatusEnum.active
              )
            )
          )
          break
        }
        case 'completed': {
          this.tasks$ = this.tasksService.tasks$.pipe(
            map(tasksObj =>
              tasksObj[this.todoId].filter(
                el => el.status === this.taskStatusEnum.completed
              )
            )
          )
          break
        }
        default: {
          this.tasks$ = this.tasksService.tasks$.pipe(
            map(tasksObj => tasksObj[this.todoId])
          )
        }
      }
    }
  }

  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksService.removeTask(data)
  }

  changeTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTaskStatus(data)
  }
}
