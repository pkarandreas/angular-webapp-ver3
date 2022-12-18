import { Component, OnInit } from '@angular/core';
import { CourseClass } from '../Models/CoursesClass';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CoursesSrvService } from '../Services/courses-srv.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DateValidator } from '../CustomValidators/DateValidator.validator'
import { Observable } from 'rxjs';
import { FormStatus } from '../Models/CourseTypes';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public course: CourseClass ;
  public courseForm : FormGroup;
  public StartMinDate :string = new Date().toISOString().slice(0,10);
  public tmp :Date;
  public CourseMaxDate : string='';
  public formTitle:string='';
  public message :string ='';
  public isHidden : boolean = false;
  public _courseID : number=0;
  public _courseStatus : FormStatus = FormStatus.CREATE;

  constructor(private fb:FormBuilder,private srv:CoursesSrvService,private route: Router,private activeRouter :ActivatedRoute) {

  }

  ngOnInit(): void {
    this.tmp = new Date();
    this.tmp.setFullYear(this.tmp.getFullYear()+1);
    this.CourseMaxDate = this.tmp.toISOString().slice(0,10);
    this.activeRouter.paramMap.subscribe( param=>{
    this._courseID = Number(param.get('id'));
    this.courseForm = this.fb.group({
      CourseID :[{value :null , disabled : true}],
      CourseTitle :  [null, Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(30)])],
      CourseStartDate : [null,Validators.compose([Validators.required,DateValidator.between(this.StartMinDate,this.CourseMaxDate)])],
      CourseDuration : [null, Validators.compose([Validators.required,Validators.min(2),Validators.max(20)])]
      });
      if (this._courseID >0){
        this._courseStatus = FormStatus.EDIT;
        this.srv.getCourseByID(this._courseID).subscribe(data=>{
        this.course = data;
        this.formTitle="Edit Course Form";
        this.courseForm.patchValue({CourseID :this.course.id,CourseTitle :this.course.courseTitle , CourseStartDate : this.course.startDate.toString().slice(0,10), CourseDuration : this.course.duration});
        });
      }
      else{
        this._courseStatus = FormStatus.CREATE;
        this.formTitle="Create Course Form";
      }
    });
  }
  onFormSubmit(){
   if (this.courseForm.valid){
       this.course = new CourseClass();
       this.course.courseTitle = this.courseForm.get('CourseTitle').value;
       this.course.startDate = new Date(this.courseForm.get('CourseStartDate').value);
       this.course.duration = this.courseForm.get('CourseDuration').value;
    if (this._courseStatus == FormStatus.CREATE){
       if (this.srv.postCourse(this.course))
       {
        this.isHidden=true;
        this.message = `The Course record with Title : ${this.course.courseTitle} saved successfully`;
        this.hideDiv();
       }
    }
    else {
      this.course.id = this._courseID;
      this.srv.putAuthor(this.course);
      this.isHidden=true;
      this.message = `The Course record with Title : ${this.course.courseTitle} edited successfully`;
        this.hideDiv();
    }
   }
  }
  hideDiv(){
    setTimeout(()=>{this.isHidden = false;this.route.navigate(['courses']); },5000);
   }
   onCancelHandler(){
    this.route.navigate(['courses']);
   }
}
