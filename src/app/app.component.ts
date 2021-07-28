import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curd-app';
  allUser : any;
   isEdit = false;
  userObj = {
    fname : '',
    lname:'',
    email:'',
    phone:'',
    organisation:'',
  }
  constructor(private commonService:CommonService){}

  ngOnInit(){
    this.getLatestUser();
  }

  // create user
  addUser(formObj:any){
    console.log(formObj)
    this.commonService.createUser(formObj).subscribe((response)=>{
      this.getLatestUser();
    })

  }
  getLatestUser(){
    this.commonService.getAllUser().subscribe((response)=>{
      this.allUser = response;
    })
  }
  editUser(user:any){
    this.isEdit = true;
    this.userObj = user;
    

  }
  deleteUser(user:any){
    this.commonService.deleteUser(user).subscribe(()=>{
      this.getLatestUser();
    })
  }

  updateUser(){
    this.isEdit = !this.isEdit;
    this.commonService.updateUser(this.userObj).subscribe(()=>{
      this.getLatestUser();

    })

  }
}
