import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { User } from '../../shared/user.modal';
// import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router) { }

signInForm: FormGroup;
BaseURL = '';
error= '';
message: string= '';
messageshow = false;

  ngOnInit() {
    this.BaseURL = location.origin;

this.signInForm = new FormGroup({
  'email': new FormControl(null, [Validators.required, Validators.email]),
  'password': new FormControl(null, Validators.required)
});
  }

  onSubmit(){
// console.log(this.BaseURL);
const user: User = {
email: this.signInForm.value.email,
password: this.signInForm.value.password
}

this.employeeService.signIn(user).subscribe((res)=>{
  if(+res >= 1){
    this.messageshow = false;
    this.router.navigate(['/employee']);
  }else{
    console.log('Not Allowed');
    this.messageshow = true;
    this.message = 'Username or Password is wrong!';
    }
},
(err)=>this.error = err);

  }

  

}
