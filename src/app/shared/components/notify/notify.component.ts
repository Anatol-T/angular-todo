import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../../../core/services/notification.service'
import { Observable } from 'rxjs'
import { Notify } from '../../../core/models/notify.models'

@Component({
  selector: 'tl-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent implements OnInit {
  notify$: Observable<Notify | null>
  constructor(private notificationService: NotificationService) {
    this.notify$ = this.notificationService.notify$
  }

  ngOnInit(): void {}

  closeNotification() {
    this.notificationService.clear()
  }
}
