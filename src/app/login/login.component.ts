import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { User } from '../user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../src/bootstrap/css/bootstrap.min.css'
  ]
})
export class LoginComponent implements OnInit {
  constructor(private _service: LoginService) {}
  form: FormGroup;
  title = 'Login';
  user: User;
  dbUsr: User;
  showDetails = false;
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit(values: FormGroup) {
    this.user = new User();
    this.user.username = values.controls['username'].value;
    this.user.password = values.controls['password'].value;
    this.callService();
  }
  callService() {
    this._service.getLoginDetails(this.user).subscribe((response: any) => {
      this.dbUsr = mapLoginDetails(response);
      this.showDetails = true;
      console.log(this.showDetails);
    });
  }
}

function mapLoginDetails(value: any): User {
  let user = new User();
  user.username = (<User>value).username;
  user.password = (<User>value).password;
  user.enabled = (<User>value).enabled;
  user.accountNonLocked = (<User>value).accountNonLocked;
  user.accountNonExpired = (<User>value).accountNonExpired;
  user.credentialNonExpired = (<User>value).credentialNonExpired;
  return user;
}
