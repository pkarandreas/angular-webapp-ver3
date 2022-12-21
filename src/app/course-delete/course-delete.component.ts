import { Component, OnInit,Inject, Input, Output ,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CourseClass } from '../Models/CoursesClass';
import { CoursesSrvService } from '../Services/courses-srv.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit{
public courseID : string | undefined;
public course : CourseClass;
public message :string ="";
constructor(@Inject(MAT_DIALOG_DATA) public data :number,private srv:CoursesSrvService) {

  if (Number(data) >= 1000 ){
    this.srv.getCourseByID(Number(data)).subscribe((result)=>{
      this.course = result;
      this.message=`Do you want to delete : ${this.course.courseTitle} ?`;
    });
  }
 }

  ngOnInit(): void {

  }

}
