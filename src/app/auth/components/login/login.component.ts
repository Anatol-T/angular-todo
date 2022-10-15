import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'tl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    rememberMe: new FormControl(false),
  })
  mail = ''

  constructor() {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  onSubmit() {
    const value = this.loginForm.value
    this.mail = JSON.stringify(this.email?.value)
  }
}
