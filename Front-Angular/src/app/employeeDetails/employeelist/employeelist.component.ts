import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employeeall } from '../../shared/employeeall.modal';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

employeeList: Employeeall[];
error = '';
alertDelete: string;
deleteShow = false;

  constructor(private employeeService: EmployeeService, private router: Router) { }




  ngOnInit() {
this.getEmployee();
}

getEmployee(): void {
  this.employeeService.getEmployee().subscribe(
(data: Employeeall[]) =>{
  this.employeeList = data;
  console.log(this.employeeList);
},
(err) => {
  this.error = err;
}
  )
}

delete(id: number){
  this.employeeService.deleteEmployee(+id).subscribe((res: Employeeall[])=>{
    this.employeeList = res;
    this.deleteShow = true; 
    this.alertDelete = 'Data had been deleted!';
    // this.getEmployee();
  })
  }

  update(id: number){
    this.router.navigate(['/employee/update', id]);
    }

  }


