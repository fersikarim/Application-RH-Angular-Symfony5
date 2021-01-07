import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error= '';
  constructor(private employeeService: EmployeeService, private router: Router) { }
  messagesignpShow = false;
  messageSignup =  '';
  signUpForm: FormGroup;

  ngOnInit() {

    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })

  
  }

  onSubmit(){
const user = {
    email: this.signUpForm.value.email,
   password:  this.signUpForm.value.password
  }
    this.employeeService.signUp(user).subscribe((data)=>
    {
      this.messagesignpShow = true;
      this.messageSignup = "Account has been created!";
this.router.navigate(['/employee']);
    },
    (err)=>{
      this.error=err;
      this.messageSignup = "Something went wrong";
    })
   }

}
