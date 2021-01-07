import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../shared/employee.modal';


@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {



  constructor(private employeeService: EmployeeService ) { }

  addEmployee: FormGroup;
  addMessage:string;
  addMessageShow = false;
  error;

  ngOnInit() {

this.addEmployee = new FormGroup({
  name: new FormControl(null, Validators.required),
  email: new FormControl(null, [Validators.required, Validators.email]),
  phone: new FormControl(null, Validators.required),
  role: new FormControl(null)
})
}
newEmployee: Employee;
onSubmit(){
    this.newEmployee = {
name: this.addEmployee.value.name,
email: this.addEmployee.value.email,
phone: this.addEmployee.value.phone,
role: this.addEmployee.value.role
}
    this.employeeService.addEmployee(this.newEmployee ).subscribe(data=>{
      console.log(data)
      this.addMessageShow = true;
      this.addMessage = "Data has been added!";
    },
    (err)=>this.error = err
    );
}

}



