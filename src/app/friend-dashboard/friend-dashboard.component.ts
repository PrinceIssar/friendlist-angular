import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from "@angular/forms";
import {FriendModel} from "./friend-dash board.model";
import {ApiService} from "../shared/api.service";
import {IDepartment} from "../department.interface";


@Component({
  selector: 'app-employ-dashboard',
  templateUrl: './friend-dashboard.component.html',
  styleUrls: ['./friend-dashboard.component.css']
})
export class FriendDashboardComponent implements OnInit {
  public departments:Array<IDepartment> = [{id:1,name:'Angular'},
    {id:2,name:'JavaScript'},{id:3,name:'PHP'}];

  public deptId: number = 0;
  formValue !: FormGroup;
  friendModelObj : FriendModel = new FriendModel();
  friendData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  // we can use the friendModelObj to post our data
  constructor(private formbuilder : FormBuilder,
              private api : ApiService) { }

  ngOnInit(): void {
    //add the form control which we have it in the form
    this.formValue = this.formbuilder.group({
      // we need a form control so that the value can bind to our input tags, for that we need to have a formGroup in our html and formValue as it's value
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      favoriteLanguage : [''],
    })
    // call the getFriend in ngOnInit
      this.getAllFriend();
  }

  public onDeptChange(){
    console.log(this.deptId);
  }
  public resetDept(){
    this.deptId = 0;
  }



  clickAddFriend(){
    //first to reset the form
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate= false;
  }
  // post the data ,needs to create a method
  postFriendDetails(){
    this.friendModelObj.firstName = this.formValue.value.firstName;
    this.friendModelObj.lastName = this.formValue.value.lastName;
    this.friendModelObj.email =this.formValue.value.email;
    this.friendModelObj.mobile =this.formValue.value.mobile;
    this.friendModelObj.favoriteLanguage =this.formValue.value.favoriteLanguage;
    // post the data


    this.api.postFriend(this.friendModelObj)
      .subscribe(res=>{
      console.log(res);
      alert("Friend Added SuccessFully")
        let reference = document.getElementById('cancel')
        //to cancel the reference
        reference?.click();
        //once the data added , we need to rest the form
        this.formValue.reset();
        //once a friend is added , it should display
        this.getAllFriend();
    },
      err=> {
        alert('Something went wrong');
      })
  }
// to have dynamic data
  getAllFriend(){
    this.api.getFriend()
      .subscribe(res=>{
        //use this to store the data in frienddata
        this.friendData =res;
      })
  }
  //delete function
  deleteFriend(row : any){
    this.api.deleteFriend(row.id)
      .subscribe(res=>{
        alert("Friend Deleted Permanently");
        // to refresh automatically after deleting the data
        this.getAllFriend();

      })
  }
  //the value of selected row should come in the edit form
  onEdit(row : any){

    this.showAdd= false;
    this.showUpdate= true ;

    this.friendModelObj.id = row.id;

    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['favoriteLanguage'].setValue(row.favoriteLanguage);
  }

  // update the details
  updateFriendDetails(){
    this.friendModelObj.firstName = this.formValue.value.firstName;
    this.friendModelObj.lastName = this.formValue.value.lastName;
    this.friendModelObj.email =this.formValue.value.email;
    this.friendModelObj.mobile =this.formValue.value.mobile;
    this.friendModelObj.favoriteLanguage =this.formValue.value.favoriteLanguage;

    this.api.updateFriend(this.friendModelObj,this.friendModelObj.id)
      .subscribe(res=>{
        alert('Updated Successfully');
        let reference = document.getElementById('cancel')
        //to cancel the reference
        reference?.click();
        //once the data added , we need to rest the form
        this.formValue.reset();
        //once a friend is added , it should display
        this.getAllFriend();
      })
  }
}


