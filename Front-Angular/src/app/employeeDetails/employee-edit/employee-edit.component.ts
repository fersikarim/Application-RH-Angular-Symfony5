import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
 
import { Employeeall } from 'src/app/shared/employeeall.modal';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employeeList: Employeeall[];
  editableId: number ;
  error= '';
  updateMsg: string = '';
  updateMsgShow = false;

  constructor(private employeeService: EmployeeService, private activatedroute: ActivatedRoute,  ) { }
id: number;
  addEmployee: FormGroup;

  ngOnInit() {

    this.addEmployee = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      role: new FormControl(null)
    })


this.activatedroute.paramMap.subscribe((params)=>{
const idEdit = +params.get('id');
this.getemployeewithId(idEdit);
});
}



getemployeewithId(idEdit: number): void{
  this.employeeService.getSingleEmployee(idEdit).subscribe(
    (data: Employeeall[])=> {
       this.employeeList = data;
       this.editableId = +idEdit;
       this.addEmployee.controls.name.setValue(this.employeeList[0].name);
       this.addEmployee.controls.email.setValue(this.employeeList[0].email);
       this.addEmployee.controls.phone.setValue(this.employeeList[0].phone);
       this.addEmployee.controls.role.setValue(this.employeeList[0].role);
      // console.log(this.employeeList[0].name);
    },
    (err)=>{this.error = err; console.log(this.error)}
  )
}

newEmployee: Employeeall;
onUpdate(id: number){
    this.newEmployee = {
id: id,
name: this.addEmployee.value.name,
email: this.addEmployee.value.email,
phone: this.addEmployee.value.phone,
role: this.addEmployee.value.role
}
    this.employeeService.updateEmployee(this.newEmployee).subscribe(data=>{
      console.log(data);
      this.updateMsgShow = true;
 this.updateMsg = 'Data has been updated!';
  
    });
}
}
