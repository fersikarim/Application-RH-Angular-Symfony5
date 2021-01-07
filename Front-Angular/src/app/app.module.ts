import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './core/header/header.component';
import { AddemployeeComponent } from './employeeDetails/addemployee/addemployee.component';
import { EmployeelistComponent } from './employeeDetails/employeelist/employeelist.component';
import { EmployeeEditComponent } from './employeeDetails/employee-edit/employee-edit.component';
import { EmployeeService } from './services/employee.service';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'employee', component: EmployeelistComponent},
  {path: 'employee/update/:id', component: EmployeeEditComponent},
  {path: 'add', component: AddemployeeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    AddemployeeComponent,
    EmployeelistComponent,
    EmployeeEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
