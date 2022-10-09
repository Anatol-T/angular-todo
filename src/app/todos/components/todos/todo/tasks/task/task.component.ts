import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Task, UpdateTaskModel } from '../../../../../models/tasks.models'
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
  @Output() updateTaskEvent = new EventEmitter<{
    todoId: string
    taskId: string
    model: UpdateTaskModel
  }>()

  constructor() {}

  ngOnInit(): void {}

  taskStatusEnum = TaskStatusEnum
  newTitle = ''
  editMode = false

  removeTaskHandler() {
    this.removeTaskEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
    })
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked

    this.changeTask({
      status: newStatus
        ? this.taskStatusEnum.completed
        : this.taskStatusEnum.active,
    })
  }

  activateEditMode() {
    this.newTitle = this.task.title
    this.editMode = true
  }

  editTitleHandler() {
    this.changeTask({ title: this.newTitle })
    this.editMode = false
  }
  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title: this.task.title,
      completed: this.task.completed,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate,
      ...patch,
    }
    this.updateTaskEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
      model,
    })
  }
}
