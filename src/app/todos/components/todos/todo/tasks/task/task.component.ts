import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Task } from '../../../../../models/tasks.models'
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{
    todoId: string
    taskId: string
  }>()

  constructor() {}

  ngOnInit(): void {}

  taskStatusEnum = TaskStatusEnum

  removeTaskHandler() {
    this.removeTaskEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
    })
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
  }
}
