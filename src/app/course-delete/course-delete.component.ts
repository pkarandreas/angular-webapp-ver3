import { Component, OnInit, Input, Output ,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CourseClass } from '../Models/CoursesClass';
import { CoursesSrvService } from '../Services/courses-srv.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.css']
})
export class CourseDeleteComponent implements OnInit{
public courseID : string | undefined;
@Output() deleteEvent = new EventEmitter()
@Input() public course:CourseClass;
public message :string ="";
 constructor(private srv:CoursesSrvService) {
 }

  ngOnInit(): void {

  }

}
